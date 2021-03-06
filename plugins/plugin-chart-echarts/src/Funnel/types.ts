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
  DEFAULT_LEGEND_FORM_DATA,
  EchartsLegendFormData,
  LegendOrientation,
  LegendType,
} from '../types';

export type EchartsFunnelFormData = EchartsLegendFormData & {
  colorScheme?: string;
  groupby: string[];
  labelLine: boolean;
  labelType: EchartsFunnelLabelTypeType;
  metric?: string;
  showLabels: boolean;
  numberFormat: string;
  min: number;
  max: number;
  gap: number;
  sort: 'descending' | 'ascending' | 'none' | undefined;
  orient: 'vertical' | 'horizontal' | undefined;
};

export enum EchartsFunnelLabelTypeType {
  Key = 'key',
  Value = 'value',
  Percent = 'percent',
  KeyValue = 'key_value',
  KeyPercent = 'key_percent',
  KeyValuePercent = 'key_value_percent',
}

export const DEFAULT_FORM_DATA: EchartsFunnelFormData = {
  ...DEFAULT_LEGEND_FORM_DATA,
  groupby: [],
  labelLine: false,
  labelType: EchartsFunnelLabelTypeType.Key,
  legendOrientation: LegendOrientation.Top,
  legendType: LegendType.Scroll,
  numberFormat: 'SMART_NUMBER',
  showLabels: true,
  min: 0,
  max: 100,
  sort: 'descending',
  orient: 'vertical',
  gap: 0,
};
