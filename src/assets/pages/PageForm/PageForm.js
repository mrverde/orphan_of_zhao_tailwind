import React from "react";
import { Formik, Field, Form, useField, useFormikContext } from 'formik';
import DatePicker from "react-datepicker";
import * as Yup from 'yup';

const PageForm = () => {

    const encode = (data) => {
        return Object.keys(data)
            .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
            .join("&")
    }

    const onSubmit = (values, actions) => {
        fetch("/", {
            method: 'POST',
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: encode({
                'form-name': 'contact',
                ...values
            }),
        })
            .then(() => {
                alert('Success')
                actions.resetForm()
            })
            .catch((error) => {
                alert(error)
            })
            .finally(() => actions.setSubmitting(false))
    }

    const DatePickerField = ({ ...props }) => {
        const { setFieldValue } = useFormikContext();
        const [field] = useField(props);
        return (
            <DatePicker
                {...field}
                {...props}
                dateFormat="d/M/Y"
                selected={(field.value && new Date(field.value)) || null}
                onChange={val => {
                    setFieldValue(field.name, val);
                }}
            />
        );
    };

    const SignupSchema = Yup.object().shape({

        name: Yup.string()
            .min(2, 'Must have at least 2 characters')
            .max(50, 'Must have a maximun of 50 characters')
            .matches(/[A-Za-záéíóúÁÉÍÓÚäëïöüÄËÏÖÜàèìòùÀÈÌÒÙ]+/, "Only characters are allowed")
            .required('Name is required'),

        email: Yup.string().email('Invalid email').required('Email is required'),

        date: Yup.date()
            .min(new Date(), 'Date must be later than today.')
            .required('Date is required'),

    });

    return (
        <div className="flex justify-center w-screen pt-8 pb-40">
            <div className="flex flex-col justify-center max-w-screen-sm p-8 mx-4 my-0 bg-white shadow">
                <h1 className="mb-5 text-5xl font-normal">Ticket Reservation</h1>
                <Formik
                    initialValues={
                        {
                            name: '',
                            email: '',
                            tickets: '1',
                            date: new Date()
                        }
                    }
                    validationSchema={SignupSchema}

                    onSubmit={onSubmit}
                >
                    {({ isSubmitting, errors, touched }) => (
                        <Form name="contact" data-netlify={true} >
                            <div className="mb-4">
                                <label className="form-label" htmlFor="name">Name*</label>
                                <Field className="form-field text-secondary" name="name" type="text" />
                                {errors.name && touched.name ? (<div className="form-error">{errors.name}</div>) : null}
                            </div>

                            <div className="mb-4">
                                <label className="form-label" htmlFor="email">Email Address*</label>
                                <Field className="form-field text-secondary" name="name" type="text" name="email" type="email" />
                                {errors.email && touched.email ? (<div className="form-error">{errors.email}</div>) : null}
                            </div>

                            <div className="mb-4">
                                <label className="form-label" htmlFor="tickets">Number of Tickets:</label>
                                <Field className="bg-white form-field text-secondary" name="name" type="text" as="select" name="tickets">
                                    {[...Array(10).keys()].map((el) => (
                                        <option key={`opt-${el}`} value={el + 1}>{el + 1}</option>
                                    ))}
                                </Field>
                                {errors.tickets && touched.tickets ? (<div className="form-error">{errors.tickets}</div>) : null}
                            </div>

                            <div className="mb-4">
                                <label className="form-label" htmlFor="date">Date of reservation:*</label>
                                <DatePickerField className="form-field text-secondary" name="name" type="text" name="date" />
                                {errors.date ? (<div className="form-error">{errors.date}</div>) : null}
                            </div>

                            <div className="mb-4">
                                <button className="float-right px-4 py-2 mt-2 text-lg font-medium text-white border rounded-md hover:bg-opacity-90 bg-primary" type="submit" disabled={isSubmitting}>{isSubmitting ? "Please wait..." : "Submit"}</button>
                            </div>

                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default PageForm;