import { RJSFSchema } from "@rjsf/utils";
import * as React from "react";
import { useCallback } from "react";
import { useState } from "react";
import MonacoEditor from '@monaco-editor/react'
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";

const EventSchemaCreator = () => {
    const initialSchema: RJSFSchema = {
        type: "object",
        properties: {},
        required: []
    };

    const [schema, setSchema] = useState<RJSFSchema>(initialSchema);

    const monacoEditorOptions = {
        minimap: {
            enabled: false,
        },
        automaticLayout: true,
    };

    const [valid, setValid] = useState(true);
    const onCodeChange = useCallback((code: string | undefined) => {
        if (!code) {
            return;
        }

        try {
            const parsedCode = JSON.parse(code);
            setValid(true);
            setSchema(parsedCode);
        } catch (err) {
            setValid(false);
        }
    }, [setValid]);

    return (
        <>
            <div className='row p-2'>
                <div className='col-4 card p-0 me-4'>
                    <div className='card-header'>Create new event schema</div>
                    
                    <MonacoEditor
                    language='json'
                    value={JSON.stringify(schema, null, 2)}
                    theme='vs-light'
                    onChange={onCodeChange}
                    height={400}
                    options={monacoEditorOptions}
                    />
                </div>
                
                <div className='col-6 card p-0'>
                    <div className='card-header'>Event Preview</div>
                    
                    <div className="p-3">
                        <Form schema={schema} validator={validator} children={true} />
                    </div>
                </div>
            </div>

            <button className='btn btn-primary'>Create Schema</button>
        </>
    );
};

export default EventSchemaCreator;