import React, { useState } from "react";
import form_schema from "./form.json";

const DynamicFormComponent = ({ schema }) => {
  const [formData, setFormData] = useState({});

  // Define event handlers
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
    onFocus: {
      handleProjectNameFocus: (e) => {
        console.log("Focus event triggered in project name input");
      },
    },
    onMouseOver: {
      handlePasswordMouseOver: (e) => {
        console.log("Mouse over event on project password input");
      },
    },
    onMouseOut: {
      handlePasswordMouseOut: (e) => {
        console.log("Mouse out event on project password input");
      },
    },
  };

  // Handle input change
  const handleInputChange = (fieldName, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  // Dynamically attach event handlers based on schema
  const applyEvents = (field) => {
    const events = {};
    if (field.events) {
      Object.entries(field.events).forEach(([eventName, handlerName]) => {
        if (eventHandlers[eventName] && eventHandlers[eventName][handlerName]) {
          events[eventName] = (e) => eventHandlers[eventName][handlerName](e);
        }
      });
    }
    return events;
  };

  return (
    <form>
      {form_schema.map((section, index) => (
        <div key={index}>
          <h2>{section.sectionTitle}</h2>
          {section.fields.map((field) => (
            <div key={field.name}>
              <label>{field.label}</label>

              {/* Select Field */}
              {field.type === "select" && (
                <select
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={(e) =>
                    handleInputChange(field.name, e.target.value)
                  }
                  required={field.required}
                >
                  {field.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              )}

              {/* Checkbox Field */}
              {field.type === "checkbox" &&
                field.options.map((option) => (
                  <label key={option.value}>
                    <input
                      type="checkbox"
                      name={field.name}
                      value={option.value}
                      checked={
                        Array.isArray(formData[field.name]) &&
                        formData[field.name].includes(option.value)
                      }
                      onChange={(e) => {
                        const newValue = Array.isArray(formData[field.name])
                          ? formData[field.name]
                          : [];
                        if (e.target.checked) {
                          newValue.push(option.value);
                        } else {
                          const index = newValue.indexOf(option.value);
                          if (index > -1) {
                            newValue.splice(index, 1);
                          }
                        }
                        handleInputChange(field.name, newValue);
                      }}
                      required={field.required}
                    />
                    {option.label}
                  </label>
                ))}

              {/* Radio Field */}
              {field.type === "radio" &&
                field.options.map((option) => (
                  <label key={option.value}>
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
                    {option.label}
                  </label>
                ))}

              {/* Date, Password, and Text Fields */}
              {(field.type === "date" ||
                field.type === "password" ||
                field.type === "text") && (
                <input
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder || ""}
                  value={formData[field.name] || ""}
                  onChange={(e) =>
                    handleInputChange(field.name, e.target.value)
                  }
                  required={field.required}
                  {...applyEvents(field)} // Dynamically attaching events
                />
              )}
            </div>
          ))}
        </div>
      ))}
    </form>
  );
};

export default DynamicFormComponent;
