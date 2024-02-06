export type GfChoices = {
  text?: string;
  value?: string;
  isSelected?: boolean | string;
  price?: string;
};

export type GfInput = {
  id?: string;
  label?: string;
  name?: string;
  isHidden?: boolean;
};

export type GfField = {
  choices?: GfChoices[];
  id?: string;
  type?: string;
  label?: string;
  name?: string;
  isHidden?: boolean;
  inputs?: GfInput[];
  description?: string;
  checkboxLabel?: string;
  visibility?: string;
  cssClass?: string;
  formId?: string | number;
  isRequired?: boolean;
  content?: string;
  multipleFiles?: boolean;
  placeholder?: string;
  defaultValue?: string;
};
