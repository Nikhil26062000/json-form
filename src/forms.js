export const formConfig = {
  fields: [
    {
      name: "projectName",
      label: "Project Name",
      type: "text",
      placeholder: "Enter project name",
      required: true,
      events: {
        onKeyUp: () => {
          console.log("onKeyUp triggered for Project Name");
        },
        onBlur: () => {
          console.log("onBlur triggered for Project Name");
        },
      },
    },
    {
      name: "projectName2",
      label: "Project Name 2",
      type: "text",
      placeholder: "Enter project name 2",
      required: true,
      events: {
        onMouseLeave: () => {
          console.log("onMouseLeave triggered for Project Name 2");
        },
      },
    },
    {
      name: "age",
      label: "Age",
      type: "number",
      placeholder: "Enter your age",
      events: {
        onKeyUp: () => {
          console.log("Key up event on Age input");
        },
      },
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter your email",
      events: {
        onMouseOver: () => {
          console.log("Mouse is over Email input");
        },
        onMouseLeave: () => {
          console.log("Mouse left Email input");
        },
        onBlur: () => {
          console.log("Email input lost focus");
        },
      },
    },
  ],
};
