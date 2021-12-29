import { useFormik } from "formik";
import * as yup from 'yup';


// const validateForm=(values) =>{
//     const errors={}
//     console.log("validateForm",values)
    
//     if(values.email.length<5){
//         errors.email="Please provide a longer email"
//     }
//     else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email))
//      {
//     errors.email="invalid email address"
//       }


//     if(values.password.length < 8){
//         errors.password="Please provide a longer password"
//     }
//     else if(values.password.length > 12){
//         errors.password="Please provide a shorter password"
//     }


//     console.log(errors);
//     return errors;
// }



// export function BasicForm() {
//  const {handleSubmit,handleBlur,handleChange,values,touched,errors} = useFormik(
//       {
//           initialValues:{email: "", password :""},
//           validate:validateForm,
//           onSubmit:(values)=>{
//               console.log("onsubmit",values);
//           }
//       }
//   )
  
//     return (

//   <form onSubmit={handleSubmit}>
//       <input id="email" name-="email" value={values.email} onChange={handleChange} onBlur={handleBlur} type="email" placeholder="Enter your mail id" />
//       {touched.email && errors.email ? errors.email : ""}
//       <input  id="password" name-="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}  type="password" placeholder="Enter your password" />
//       {touched.password && errors.password ? errors.password : ""}
//      <button type="submit">submit</button>
//   </form>
//   );
// }


// const validateForm=(values) =>{
//     const errors={}
//     console.log("validateForm",values)
    
//     if(values.email.length<5){
//         errors.email="Please provide a longer email"
//     }
//     else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email))
//      {
//     errors.email="invalid email address"
//       }


//     if(values.password.length < 8){
//         errors.password="Please provide a longer password"
//     }
//     else if(values.password.length > 12){
//         errors.password="Please provide a shorter password"
//     }


//     console.log(errors);
//     return errors;
// }


const formvalidationSchema= yup.object({
    email: yup.string().min(5).matches((!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i),"pattern not matched").required("why not fill the mail id"),
    password:yup.string().min(8)
})

export function BasicForm() {
 const {handleSubmit,handleBlur,handleChange,values,touched,errors} = useFormik(
      {
          initialValues:{email: "", password :""},
          validationSchema : formvalidationSchema,
        //   validate:validateForm,
          onSubmit:(values)=>{
              console.log("onsubmit",values);
          }
      }
  )
  
    return (

  <form onSubmit={handleSubmit}>
      <input id="email" name-="email" value={values.email} onChange={handleChange} onBlur={handleBlur} type="email" placeholder="Enter your mail id" />
      {touched.email && errors.email ? errors.email : ""}
      <input  id="password" name-="password" value={values.password} onChange={handleChange} onBlur={handleBlur}  type="password" placeholder="Enter your password" />
      {touched.password && errors.password ? errors.password : ""}
     <button type="submit">submit</button>
  </form>
  );
}
