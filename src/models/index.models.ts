import * as giModel from  './gi.models';

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
}