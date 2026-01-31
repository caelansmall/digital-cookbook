import { Button, Form, type FormInstance } from "antd";
import { useEffect, useState, type FC, type PropsWithChildren } from "react";

interface SubmitButtonProps {
  form: FormInstance;
}

const SubmitButton: FC<PropsWithChildren<SubmitButtonProps>> = ({ form, children }) => {
  const [submittable,setSubmittable] = useState<boolean>(false);
  const values = Form.useWatch([], form);

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false));
  },[form,values]);

  return (
    <Button type="primary" htmlType='submit' className='submit-button' disabled={!submittable}>
      {children}
    </Button>
  );
};

export default SubmitButton;
