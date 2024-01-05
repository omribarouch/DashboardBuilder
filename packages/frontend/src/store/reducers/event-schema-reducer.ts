import { RJSFSchema } from "@rjsf/utils";


interface EventSchemaState {
   eventSchemas: RJSFSchema[];
}

const initialState: EventSchemaState = {
   eventSchemas: [{
    type: 'object',
    title: 'Gever Event',
    properties: {
        isGever: {
            title: 'is gever?',
            type: 'boolean'
        },
        melech: {
            title: 'melech name',
            type: 'string'
        }
    },
    required: [
        'isGever',
        'melech'
    ]
   },
   {
    type: 'object',
    title: 'Melech Event',
    properties: {
        melech: {
            title: 'melech name',
            type: 'string'
        }
    },
    required: [
        'melech'
    ]
   }]
};

const eventSchemaReducer = (state = initialState, action) => {
   switch(action) {
      default: 
         return state;
   }
}

export default eventSchemaReducer;