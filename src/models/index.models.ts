import * as giModel from  './gi.models';
import * as requestModel from './request.models';

import { SizeType } from 'antd/lib/config-provider/SizeContext';

export interface IShowButtonModals {
  _id: string
};

export interface ITableDeleteObject {
  _id: string,
  show: boolean
}

export interface IButtonsProps {
  _id: string
  title: string,
  customTitle?: string
  size: SizeType,
  widthModal: number,
  showButtons: IShowButtonModals[] | []
};

export interface IExamPsicoExtras {
  label: string,
  value: string,
  key: string,
};

export interface IAlertMessageContent {
  message: string,
  type: 'success' | 'error' | 'warning' | 'info',
  show: boolean
};

export interface ICountries {
  name: string,
  alpha3Code: string
};

export interface IColumnTable {
  title: string,
  dataIndex: string,
  key: string
};