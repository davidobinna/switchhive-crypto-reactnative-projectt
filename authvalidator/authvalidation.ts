export const emailValidator = (email: string) => {
    const re = /\S+@\S+\.\S+/;
 
    if (!email || email.length <= 0 ) return 'Email cannot be empty';
    if (!re.test(email)) return 'Ooops! we need a valid email address';
 
    return '';
 
 };
 
 export const passwordValidator = (password: string) => {
     if (!password || password.length <= 0) return 'Password cannot be empty.';
    console.log('main:', password)
     return '';
   };
   
   export const nameValidator = (name: string) => {
     if (!name || name.length <= 0) return 'Name cannot be empty.';
   
     return '';
   };
 
   export const confirmPasswordValidator = (password: string, confirmPassword: string) => {
     console.log('confirm:', password)
     if (!password || password.length <= 0 ) return 'Confirm password'
         if (password.toString() !== confirmPassword.toString()) return 'Password mismatch'
         return '';
   }