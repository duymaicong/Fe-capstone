export const validPassword = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,40}$');
export const validEmail = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z].{1,40}$');
export const validPhone= new RegExp('^(0?)[0-9]{9}$')
export const limit = new RegExp('^[a-zA-Z0-9].{1,40}$')