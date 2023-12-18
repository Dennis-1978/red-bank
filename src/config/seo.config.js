const SITE__NAME = 'RED Bank'

export const getTitle = (title) => {
  return title ? `${title} | ${SITE__NAME}` : `${SITE__NAME}`;
}