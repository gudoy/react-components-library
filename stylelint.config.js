/** @type {import('stylelint').Config} */

export default {
  extends: ['stylelint-config-standard-scss'],
  rules: {
    'block-no-empty': null,
    'selector-pseudo-element-colon-notation': 'double',
    'comment-no-empty': null,
    'scss/comment-no-empty': null,
    'scss/double-slash-comment-empty-line-before': null,
    'scss/double-slash-comment-whitespace-inside': null,
  },
};
