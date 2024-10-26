import React, { useState } from "react";
import formSchema from "./form.json"; // Assuming the schema is stored in form.json

// Define all event functions grouped by event type
const eventHandlers = {
  onKeyUp: {
    handleProjectNameKeyUp: (e) => {
      console.log("Key up event triggered in project name input");
    },
  },
  onBlur: {
    handleProjectNameBlur: (e) => {
      console.log("Blur event triggered in project name input");
    },
  },
};

const FormGenerator = () => {
  const [formData, setFormData] = useState({});

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const isVisible = (visibility) => {
    if (!visibility) return true;
    const { field, value } = visibility;
    return formData[field] === value;
  };

  // Function to handle onKeyUp events
  const handleKeyUp = (field) => (e) => {
    if (field.onKeyUp && eventHandlers.onKeyUp[field.onKeyUp]) {
      eventHandlers.onKeyUp[field.onKeyUp](e);
    }
  };

  // Function to handle onBlur events
  const handleBlur = (field) => (e) => {
    if (field.onBlur && eventHandlers.onBlur[field.onBlur]) {
      eventHandlers.onBlur[field.onBlur](e);
    }
  };

  return (
    <form>
      {formSchema.map((section, secIndex) => (
        <div key={secIndex}>
          <h3>{section.sectionTitle}</h3>
          {section.fields.map((field, fieldIndex) => {
            if (!isVisible(field.visibility)) return null;

            switch (field.type) {
              case "select":
                return (
                  <div key={fieldIndex}>
                    <label>{field.label}</label>
                    <select
                      name={field.name}
                      value={formData[field.name] || ""}
                      onChange={(e) =>
                        handleInputChange(field.name, e.target.value)
                      }
                      required={field.required}
                    >
                      <option value="" disabled>
                        Select an option
                      </option>
                      {field.options.map((option, index) => (
                        <option key={index} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                );
              case "text":
              case "date":
                return (
                  <div key={fieldIndex}>
                    <label>{field.label}</label>
                    <input
                      type={field.type}
                      name={field.name}
                      placeholder={field.placeholder || ""}
                      value={formData[field.name] || ""}
                      onChange={(e) =>
                        handleInputChange(field.name, e.target.value)
                      }
                      onKeyUp={handleKeyUp(field)}
                      onBlur={handleBlur(field)}
                      required={field.required}
                    />
                  </div>
                );
              case "checkbox":
                return (
                  <div key={fieldIndex}>
                    <label>{field.label}</label>
                    {field.options.map((option, index) => (
                      <div key={index}>
                        <input
                          type="checkbox"
                          name={option.value}
                          checked={formData[option.value] || false}
                          onChange={(e) => {
                            const newValue = !formData[option.value];
                            handleInputChange(option.value, newValue);
                          }}
                        />
                        <label>{option.label}</label>
                      </div>
                    ))}
                  </div>
                );
              case "radio":
                return (
                  <div key={fieldIndex}>
                    <label>{field.label}</label>
                    {field.options.map((option, index) => (
                      <div key={index}>
                        <input
                          type="radio"
                          name={field.name}
                          value={option.value}
                          checked={formData[field.name] === option.value}
                          onChange={(e) =>
                            handleInputChange(field.name, e.target.value)
                          }
                          required={field.required}
                        />
                        <label>{option.label}</label>
                      </div>
                    ))}
                  </div>
                );
              default:
                return null;
            }
          })}
        </div>
      ))}
    </form>
  );
};

export default FormGenerator;
