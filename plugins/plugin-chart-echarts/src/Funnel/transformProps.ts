/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import {
  CategoricalColorNamespace,
  ChartProps,
  DataRecord,
  getMetricLabel,
  getNumberFormatter,
  NumberFormats,
  NumberFormatter,
} from '@superset-ui/core';
import { CallbackDataParams } from 'echarts/types/src/util/types';
import { EChartsOption, FunnelSeriesOption } from 'echarts';
import {
  DEFAULT_FORM_DATA as DEFAULT_FUNNEL_FORM_DATA,
  EchartsFunnelFormData,
  EchartsFunnelLabelTypeType,
} from './types';
import { DEFAULT_LEGEND_FORM_DATA, EchartsProps } from '../types';
import { extractGroupbyLabel, getChartPadding, getLegendProps } from '../utils/series';
import { defaultGrid, defaultTooltip } from '../defaults';

const percentFormatter = getNumberFormatter(NumberFormats.PERCENT_2_POINT);

export function formatFunnelLabel({
  params,
  labelType,
  numberFormatter,
}: {
  params: CallbackDataParams;
  labelType: EchartsFunnelLabelTypeType;
  numberFormatter: NumberFormatter;
}): string {
  const { name = '', value, percent } = params;
  const formattedValue = numberFormatter(value as number);
  const formattedPercent = percentFormatter((percent as number) / 100);
  switch (labelType) {
    case EchartsFunnelLabelTypeType.Key:
      return name;
    case EchartsFunnelLabelTypeType.Value:
      return formattedValue;
    case EchartsFunnelLabelTypeType.Percent:
      return formattedPercent;
    case EchartsFunnelLabelTypeType.KeyValue:
      return `${name}: ${formattedValue}`;
    case EchartsFunnelLabelTypeType.KeyValuePercent:
      return `${name}: ${formattedValue} (${formattedPercent})`;
    case EchartsFunnelLabelTypeType.KeyPercent:
      return `${name}: ${formattedPercent}`;
    default:
      return name;
  }
}

export default function transformProps(chartProps: ChartProps): EchartsProps {
  const { width, height, formData, queriesData } = chartProps;
  const data: DataRecord[] = queriesData[0].data || [];

  const {
    colorScheme,
    groupby,
    min,
    max,
    orient,
    sort,
    gap,
    labelLine,
    labelType,
    legendMargin,
    legendOrientation,
    legendType,
    metric = '',
    numberFormat,
    showLabels,
    showLegend,
  }: EchartsFunnelFormData = {
    ...DEFAULT_LEGEND_FORM_DATA,
    ...DEFAULT_FUNNEL_FORM_DATA,
    ...formData,
  };
  const metricLabel = getMetricLabel(metric);
  const keys = data.map(datum => extractGroupbyLabel({ datum, groupby }));
  const colorFn = CategoricalColorNamespace.getScale(colorScheme as string);
  const numberFormatter = getNumberFormatter(numberFormat);

  const transformedData: FunnelSeriesOption[] = data.map(datum => {
    const name = extractGroupbyLabel({ datum, groupby });
    return {
      value: datum[metricLabel],
      name,
      itemStyle: {
        color: colorFn(name),
      },
    };
  });

  const formatter = (params: CallbackDataParams) =>
    formatFunnelLabel({ params, numberFormatter, labelType });

  const defaultLabel = {
    formatter,
    show: showLabels,
    color: '#000000',
  };

  const series: FunnelSeriesOption[] = [
    {
      type: 'funnel',
      ...getChartPadding(showLegend, legendOrientation, legendMargin),
      animation: true,
      min,
      max,
      minSize: '0%',
      maxSize: '100%',
      sort,
      orient,
      gap,
      funnelAlign: 'center',
      labelLine: labelLine ? { show: true } : { show: false },
      label: {
        ...defaultLabel,
        position: labelLine ? 'outer' : 'inner',
      },
      emphasis: {
        label: {
          show: true,
          fontWeight: 'bold',
        },
      },
      data: transformedData,
    },
  ];

  const echartOptions: EChartsOption = {
    grid: {
      ...defaultGrid,
    },
    tooltip: {
      ...defaultTooltip,
      trigger: 'item',
      formatter: (params: any) =>
        formatFunnelLabel({
          params,
          numberFormatter,
          labelType: EchartsFunnelLabelTypeType.KeyValuePercent,
        }),
    },
    legend: {
      ...getLegendProps(legendType, legendOrientation, showLegend),
      data: keys,
    },
    series,
  };

  return {
    width,
    height,
    echartOptions,
  };
}
