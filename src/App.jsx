import React, { useState } from "react";
import form_schema from "./form.json";
import { useEffect } from "react";

const DynamicFormComponent = ({ schema }) => {
  const [formData, setFormData] = useState({ experienceType: "frontend" });

  useEffect(() => {
    console.log(formData);
  }, []);

  // Define event handlers
  const eventHandlers = {
    onKeyUp: {
      handleProjectNameKeyUp: (e, para) => {
        console.log("Key up event triggered in project name input", para);
      },
    },
    onBlur: {
      handleProjectNameBlur: (e, para) => {
        console.log("Blur event triggered in project name input", para);
      },
    },
    onFocus: {
      handleProjectNameFocus: (e, para) => {
        console.log("Focus event triggered in project name input", para);
      },
    },
    onMouseOver: {
      handlePasswordMouseOver: (e, para) => {
        console.log("Mouse over event on project password input", para);
      },
    },
    onMouseOut: {
      handlePasswordMouseOut: (e, para) => {
        console.log("Mouse out event on project password input", para);
      },
    },
  };

  // Handle input change
  const handleInputChange = (fieldName, value) => {
    console.log("fieldName :", fieldName);
    console.log("value :", value);
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
    console.log(formData);
  };

  // Check visibility of a field based on selected experience type
  const isFieldVisible = (field) => {
    if (field.visibility) {
      const { field: visibilityField, value } = field.visibility;
      return formData[visibilityField] === value;
      // if (value.includes(formData[visibilityField])) {
      //   return true;
      // } else {
      //   return false;
      // }
    }
    return true; // Default to visible if no visibility rule
  };

  // Dynamically attach event handlers based on schema
  const applyEvents = (field) => {
    const events = {};
    if (field.events) {
      Object.entries(field.events).forEach(([eventName, handlerName]) => {
        if (eventHandlers[eventName] && eventHandlers[eventName][handlerName]) {
          events[eventName] = (e) =>
            eventHandlers[eventName][handlerName](e, field.para);
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
          {section.fields.map(
            (field) =>
              isFieldVisible(field) && (
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
                      style={field.styles}
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
                  {["date", "password", "text"].includes(field.type) && (
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
                      style={field.styles} // Applying styles from the schema
                    />
                  )}
                </div>
              )
          )}
        </div>
      ))}
    </form>
  );
};

export default DynamicFormComponent;
