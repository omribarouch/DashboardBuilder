import { RJSFSchema } from "@rjsf/utils";
import * as React from "react";
import { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import MonacoEditor from '@monaco-editor/react'
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import { AppDispatch, RootState } from "../../../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { createEventSchema } from "../../../../../store/eventSchemaSlice";

const monacoEditorOptions = {
	minimap: {
		enabled: false,
	},
	automaticLayout: true,
};

const initialJsonSchema: RJSFSchema = {
	type: "object",
	properties: {},
	required: []
};

const initialUISchema: RJSFSchema = {};

const EventSchemaCreator = () => {
	const [name, setName] = useState<string>('');
	const [jsonSchema, setJsonSchema] = useState<RJSFSchema>(initialJsonSchema);
	const [uiSchema, setUISchema] = useState<RJSFSchema>(initialUISchema);
	const [isJsonSchemaValid, setIsJsonSchemaValid] = useState(false);
	const [isUISchemaValid, setIsUISchemaValid] = useState(true);
	const dispatch: AppDispatch = useDispatch();
	const isLoading: boolean = useSelector((state: RootState) => state.eventSchemas.isLoading);

	const onSchemaChange = (jsonCode: string,
							validityFn: (schema: RJSFSchema) => boolean,
							setSchema: Dispatch<SetStateAction<RJSFSchema>>,
							setValid: Dispatch<SetStateAction<boolean>>) => {
		try {
			const parsedCode = JSON.parse(jsonCode);
			setValid(validityFn(parsedCode));
			setSchema(parsedCode);
		} catch (err) {
			setValid(false);
		}
	};

	const jsonSchemaValidation = (updatedJsonSchema: RJSFSchema): boolean =>
		updatedJsonSchema?.properties && Object.keys(updatedJsonSchema.properties).length > 0;

	const uiSchemaValidation = (updatedUiSchema: RJSFSchema): boolean => {
		if (!jsonSchema?.properties) {
			return true;
		}

		const schemaPropertiesNames: string[] = Object.keys(jsonSchema);
		return Object.keys(updatedUiSchema)
			.some((uiPropertyName: string) => schemaPropertiesNames.includes(uiPropertyName));
	};

	return (
		<>
			<div className='row p-2 gap-3'>
				<div className="form-group">
					<label htmlFor="name">Event Schema Name</label>

					<input
						type="text"
						className="form-control"
						id="name"
						placeholder="Enter Schema Name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</div>

				<div className='col-5 card p-0'>
					<div className='card-header'>Create new event schema</div>

					<MonacoEditor
						language='json'
						value={JSON.stringify(jsonSchema, null, 2)}
						theme='vs-light'
						onChange={event => onSchemaChange(event, jsonSchemaValidation,
							setJsonSchema, setIsJsonSchemaValid)}
						height={400}
						options={monacoEditorOptions}
					/>
				</div>

				<div className='col-5 card p-0'>
					<div className='card-header'>UI Schema</div>

					<MonacoEditor
						language='json'
						value={JSON.stringify(uiSchema, null, 2)}
						theme='vs-light'
						onChange={event => onSchemaChange(event, uiSchemaValidation,
							setUISchema, setIsUISchemaValid)}
						height={400}
						options={monacoEditorOptions}
					/>
				</div>
			</div>

			{ validator.isValid(uiSchema, {}, jsonSchema) &&
				<>
					<div className='card p-0'>
						<div className='card-header'>Event Preview</div>

						<div className="p-3">
							<Form schema={jsonSchema}
								  uiSchema={uiSchema}
								  validator={validator}
								  children={true} />
						</div>
					</div>

					<button
						className='btn btn-primary'
						disabled={isLoading}
						onClick={() => dispatch(createEventSchema({
							name: name,
							baseSchema: jsonSchema,
							uiSchema: uiSchema
						}))}>
						{ isLoading &&
							<span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
						}
						Create Schema
					</button>
				</>
			}
		</>
	);
};

export default EventSchemaCreator;