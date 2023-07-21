import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

const PasswordValidator = ({ password }: { password: string }) => {
  const uppercaseRegex = /[A-Z]/;
  const numberRegex = /\d/;
  const specialCharRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~`]/;
  const SuccessIcon = <CheckOutlined />;
  const NonSuccessIcon = <CloseOutlined />;
  const config = [
    {
      regex: uppercaseRegex,
      message: "At least one uppercase letter",
    },
    {
      regex: numberRegex,
      message: "At least one number",
    },
    {
      regex: specialCharRegex,
      message: "At least one special character",
    },
    {
      regex: null,
      message: "Minimum length 8",
    },
  ];
  return (
    <div className="passwordValidator">
      {config.map((configItem, index) => {
        const configRegex = configItem.regex;
        let passwordSatisfied = false;
        if (configRegex) {
          passwordSatisfied = configRegex.test(password);
        } else {
          passwordSatisfied = password.length >= 8;
        }
        return (
          <div
            key={index}
            className={
              passwordSatisfied
                ? "validationMessageContainer success"
                : "validationMessageContainer nonSuccess"
            }
          >
            {passwordSatisfied ? SuccessIcon : NonSuccessIcon}
            <div>{configItem.message}</div>
          </div>
        );
      })}
    </div>
  );
};

export default PasswordValidator;
