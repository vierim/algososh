export const CSS_SELECTORS = {
  // inputs
  singleInput: 'input',
  valueInput: 'input[name=chars]',
  indexInput: 'input[name=index]',
  // buttons
  submitButton: 'button[type=submit]',
  addButton: 'button[name=add]',
  deleteButton: 'button[name=delete]',
  clearButton: 'button[name=clear]',
  addToHeadButton: 'button[name=addToHeadButton]',
  addToTailButton: 'button[name=addToTailButton]',
  deleteFromHeadButton: 'button[name=deleteFromHeadButton]',
  deleteFromTailButton: 'button[name=deleteFromTailButton]',
  addByIndexButton: 'button[name=addByIndexButton]',
  deleteByIndexButton: 'button[name=deleteByIndexButton]',
  // circles
  circle: '[class*=circle_content]',
  smallCircle: '[class*=circle_small]',
  circleLetter: '[class*=circle_letter]',
  circleIndex: '[class*=circle_index]',
  circleHead: '[class*=circle_head]',
  circleTail: '[class*=circle_tail]',
  circleDefaultState: '[class*=circle_default]',
  circleChangingState: '[class*=circle_changing]',
  circleModifiedState: '[class*=circle_modified]',
  // others
  listItem: '[class*=list_item]'
};

export const BASIC_LABELS = {
  topText: 'top',
  headText: 'head',
  tailText: 'tail'
}

export const STATE_COLORS = {
  default: '#0032FF',
  modified: '#d252e1'
}
