import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Button } from '../ui/button';
import { cn } from '../../lib/utils';

// Build Zod schema from config
const buildZodSchema = (fields) => {
  const schemaObj = {};
  
  fields.forEach((field) => {
    let fieldSchema;
    
    switch (field.type) {
      case 'email':
        fieldSchema = z.string().email(field.validation?.message || 'Invalid email');
        break;
      case 'number':
        fieldSchema = z.coerce.number();
        if (field.validation?.min !== undefined) {
          fieldSchema = fieldSchema.min(field.validation.min, field.validation.minMessage);
        }
        if (field.validation?.max !== undefined) {
          fieldSchema = fieldSchema.max(field.validation.max, field.validation.maxMessage);
        }
        break;
      case 'checkbox':
        fieldSchema = z.boolean();
        break;
      case 'date':
        fieldSchema = z.string();
        break;
      default:
        fieldSchema = z.string();
    }
    
    // Apply common validations
    if (field.required) {
      if (field.type === 'checkbox') {
        fieldSchema = fieldSchema.refine(val => val === true, {
          message: field.validation?.message || 'This field is required',
        });
      } else {
        fieldSchema = fieldSchema.min(1, field.validation?.message || 'This field is required');
      }
    } else {
      fieldSchema = fieldSchema.optional();
    }
    
    if (field.validation?.minLength) {
      fieldSchema = fieldSchema.min(field.validation.minLength, field.validation.minLengthMessage);
    }
    if (field.validation?.maxLength) {
      fieldSchema = fieldSchema.max(field.validation.maxLength, field.validation.maxLengthMessage);
    }
    if (field.validation?.pattern) {
      fieldSchema = fieldSchema.regex(new RegExp(field.validation.pattern), field.validation.patternMessage);
    }
    
    schemaObj[field.name] = fieldSchema;
  });
  
  return z.object(schemaObj);
};

// Field Components
const TextField = ({ field, control, error }) => (
  <div className={cn('space-y-2', field.className)}>
    <Label htmlFor={field.name}>
      {field.label}
      {field.required && <span className="text-destructive ml-1">*</span>}
    </Label>
    <Controller
      name={field.name}
      control={control}
      defaultValue={field.defaultValue || ''}
      render={({ field: inputField }) => (
        <Input
          {...inputField}
          id={field.name}
          type={field.type || 'text'}
          placeholder={field.placeholder}
          disabled={field.disabled}
          className={error ? 'border-destructive' : ''}
        />
      )}
    />
    {field.helperText && !error && (
      <p className="text-xs text-muted-foreground">{field.helperText}</p>
    )}
    {error && <p className="text-xs text-destructive">{error.message}</p>}
  </div>
);

const TextareaField = ({ field, control, error }) => (
  <div className={cn('space-y-2', field.className)}>
    <Label htmlFor={field.name}>
      {field.label}
      {field.required && <span className="text-destructive ml-1">*</span>}
    </Label>
    <Controller
      name={field.name}
      control={control}
      defaultValue={field.defaultValue || ''}
      render={({ field: inputField }) => (
        <Textarea
          {...inputField}
          id={field.name}
          placeholder={field.placeholder}
          rows={field.rows || 3}
          disabled={field.disabled}
          className={error ? 'border-destructive' : ''}
        />
      )}
    />
    {field.helperText && !error && (
      <p className="text-xs text-muted-foreground">{field.helperText}</p>
    )}
    {error && <p className="text-xs text-destructive">{error.message}</p>}
  </div>
);

const SelectField = ({ field, control, error }) => (
  <div className={cn('space-y-2', field.className)}>
    <Label htmlFor={field.name}>
      {field.label}
      {field.required && <span className="text-destructive ml-1">*</span>}
    </Label>
    <Controller
      name={field.name}
      control={control}
      defaultValue={field.defaultValue || ''}
      render={({ field: selectField }) => (
        <Select 
          value={selectField.value} 
          onValueChange={selectField.onChange}
          disabled={field.disabled}
        >
          <SelectTrigger className={error ? 'border-destructive' : ''}>
            <SelectValue placeholder={field.placeholder || 'Select an option'} />
          </SelectTrigger>
          <SelectContent>
            {field.options?.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    />
    {field.helperText && !error && (
      <p className="text-xs text-muted-foreground">{field.helperText}</p>
    )}
    {error && <p className="text-xs text-destructive">{error.message}</p>}
  </div>
);

const CheckboxField = ({ field, control, error }) => (
  <div className={cn('flex items-start space-x-3', field.className)}>
    <Controller
      name={field.name}
      control={control}
      defaultValue={field.defaultValue || false}
      render={({ field: checkField }) => (
        <Checkbox
          id={field.name}
          checked={checkField.value}
          onCheckedChange={checkField.onChange}
          disabled={field.disabled}
        />
      )}
    />
    <div className="space-y-1 leading-none">
      <Label htmlFor={field.name} className="cursor-pointer">
        {field.label}
        {field.required && <span className="text-destructive ml-1">*</span>}
      </Label>
      {field.helperText && (
        <p className="text-xs text-muted-foreground">{field.helperText}</p>
      )}
      {error && <p className="text-xs text-destructive">{error.message}</p>}
    </div>
  </div>
);

const RadioGroupField = ({ field, control, error }) => (
  <div className={cn('space-y-3', field.className)}>
    <Label>
      {field.label}
      {field.required && <span className="text-destructive ml-1">*</span>}
    </Label>
    <Controller
      name={field.name}
      control={control}
      defaultValue={field.defaultValue || ''}
      render={({ field: radioField }) => (
        <RadioGroup
          value={radioField.value}
          onValueChange={radioField.onChange}
          className={cn('flex flex-wrap gap-4', field.layout === 'vertical' && 'flex-col')}
          disabled={field.disabled}
        >
          {field.options?.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem value={option.value} id={`${field.name}-${option.value}`} />
              <Label htmlFor={`${field.name}-${option.value}`} className="cursor-pointer font-normal">
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      )}
    />
    {field.helperText && !error && (
      <p className="text-xs text-muted-foreground">{field.helperText}</p>
    )}
    {error && <p className="text-xs text-destructive">{error.message}</p>}
  </div>
);

// Field renderer map
const fieldComponents = {
  text: TextField,
  email: TextField,
  password: TextField,
  number: TextField,
  tel: TextField,
  date: TextField,
  textarea: TextareaField,
  select: SelectField,
  checkbox: CheckboxField,
  radio: RadioGroupField,
};

// Main Dynamic Form Component
export function DynamicForm({ 
  config, 
  onSubmit, 
  onCancel,
  submitLabel = 'Submit',
  cancelLabel = 'Cancel',
  showCancel = false,
  className,
  disabled = false,
  defaultValues = {},
}) {
  const schema = buildZodSchema(config.fields);
  
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      ...config.fields.reduce((acc, field) => {
        acc[field.name] = field.defaultValue || '';
        return acc;
      }, {}),
      ...defaultValues,
    },
  });
  
  const renderField = (field) => {
    // Check conditional visibility
    if (field.condition) {
      const watchedValue = watch(field.condition.field);
      if (field.condition.equals && watchedValue !== field.condition.equals) {
        return null;
      }
      if (field.condition.notEquals && watchedValue === field.condition.notEquals) {
        return null;
      }
      if (field.condition.includes && !field.condition.includes.includes(watchedValue)) {
        return null;
      }
    }
    
    const FieldComponent = fieldComponents[field.type] || TextField;
    return (
      <FieldComponent
        key={field.name}
        field={field}
        control={control}
        error={errors[field.name]}
      />
    );
  };
  
  const handleFormSubmit = (data) => {
    onSubmit?.(data);
  };
  
  return (
    <form 
      onSubmit={handleSubmit(handleFormSubmit)} 
      className={cn('space-y-6', className)}
    >
      {config.title && (
        <div className="space-y-1">
          <h3 className="text-lg font-semibold">{config.title}</h3>
          {config.description && (
            <p className="text-sm text-muted-foreground">{config.description}</p>
          )}
        </div>
      )}
      
      {/* Render fields with grid support */}
      {config.layout === 'grid' ? (
        <div className={cn('grid gap-4', config.gridCols || 'grid-cols-1 md:grid-cols-2')}>
          {config.fields.map(renderField)}
        </div>
      ) : (
        <div className="space-y-4">
          {config.fields.map(renderField)}
        </div>
      )}
      
      {/* Form Actions */}
      <div className="flex justify-end gap-3 pt-4">
        {showCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              reset();
              onCancel?.();
            }}
            disabled={isSubmitting || disabled}
          >
            {cancelLabel}
          </Button>
        )}
        <Button type="submit" disabled={isSubmitting || disabled}>
          {isSubmitting ? 'Submitting...' : submitLabel}
        </Button>
      </div>
    </form>
  );
}

export default DynamicForm;
