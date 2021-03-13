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
import React from 'react';
import { t, validateNonEmpty } from '@superset-ui/core';
import { ControlPanelConfig, D3_FORMAT_OPTIONS, sections } from '@superset-ui/chart-controls';
import { DEFAULT_FORM_DATA } from './types';
import {
  legendMarginControl,
  legendOrientationControl,
  legendTypeControl,
  showLegendControl,
} from '../controls';

const {
  min,
  max,
  sort,
  orient,
  gap,
  labelLine,
  labelType,
  numberFormat,
  showLabels,
} = DEFAULT_FORM_DATA;

const config: ControlPanelConfig = {
  controlPanelSections: [
    sections.legacyRegularTime, // ????
    // ???
    {
      label: t('Query'),
      expanded: true,
      controlSetRows: [
        ['groupby'],
        ['metric'],
        ['adhoc_filters'],
        ['row_limit'],
        [
          {
            name: 'sort_by_metric',
            config: {
              type: 'CheckboxControl',
              label: t('Sort by metric'),
              description: t('Whether to sort results by the selected metric in descending order.'),
            },
          },
        ],
      ],
    },
    {
      label: t('Chart Options'),
      expanded: true,
      controlSetRows: [
        ['color_scheme'],
        // eslint-disable-next-line react/jsx-key
        [<h1 className="section-header">{t('Legend')}</h1>],
        [showLegendControl],
        [legendTypeControl],
        [legendOrientationControl],
        [legendMarginControl],
        // eslint-disable-next-line react/jsx-key
        [<h1 className="section-header">{t('Labels')}</h1>],
        [
          {
            name: 'label_type',
            config: {
              type: 'SelectControl',
              label: t('Label Type'),
              default: labelType,
              renderTrigger: true,
              choices: [
                ['key', 'Category Name'],
                ['value', 'Value'],
                ['percent', 'Percentage'],
                ['key_value', 'Category and Value'],
                ['key_percent', 'Category and Percentage'],
                ['key_value_percent', 'Category, Value and Percentage'],
              ],
              description: t('What should be shown on the label?'),
            },
          },
        ],
        [
          {
            name: 'number_format',
            config: {
              type: 'SelectControl',
              freeForm: true,
              label: t('Number format'),
              renderTrigger: true,
              default: numberFormat,
              choices: D3_FORMAT_OPTIONS,
              description: `${t('D3 format syntax: https://github.com/d3/d3-format')} ${t(
                'Only applies when "Label Type" is set to show values.',
              )}`,
            },
          },
        ],
        [
          {
            name: 'show_labels',
            config: {
              type: 'CheckboxControl',
              label: t('Show Labels'),
              renderTrigger: true,
              default: showLabels,
              description: t('Whether to display the labels.'),
            },
          },
        ],
        [
          {
            name: 'label_line',
            config: {
              type: 'CheckboxControl',
              label: t('Label Line'),
              default: labelLine,
              renderTrigger: true,
              description: t('Draw line from Funnel to label when labels outside?'),
            },
          },
          {
            name: 'min',
            config: {
              type: 'SliderControl',
              label: t('min'),
              default: min,
              renderTrigger: true,
              description: t('The minimum value of the specified data.'),
            },
          },
          {
            name: 'max',
            config: {
              type: 'SliderControl',
              label: t('min'),
              default: max,
              renderTrigger: true,
              description: t('The maximum value of the specified data.'),
            },
          },
          {
            name: 'gap',
            config: {
              type: 'SliderControl',
              label: t('gap'),
              default: gap,
              renderTrigger: true,
              description: t('Data graph spacing.'),
            },
          },
          {
            name: 'sort',
            config: {
              type: 'SelectControl',
              label: t('sort'),
              default: sort,
              renderTrigger: true,
              description: t('Data sorting. The options are ascending, descending, none'),
            },
          },
          {
            name: 'orient',
            config: {
              type: 'SelectControl',
              label: t('orient'),
              default: orient,
              renderTrigger: true,
              description: t('Funnel chart orientation. The options are vertical, horizontal'),
            },
          },
        ],
        // eslint-disable-next-line react/jsx-key
        [<h1 className="section-header">{t('Funnel shape')}</h1>],
      ],
    },
  ],
  controlOverrides: {
    series: {
      validators: [validateNonEmpty],
      clearable: false,
    },
    row_limit: {
      default: 100,
    },
  },
};

export default config;
