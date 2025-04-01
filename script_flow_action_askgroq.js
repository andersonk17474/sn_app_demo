
/* 
*  flow action name: integration - ai chatbot - call groq
*  script step : Script step - call api
*  script step used in flow action in flow designer ( SN demo instance ) to call external api w/o integration hub
*  api provider:    https://api.groq.com/v1/chat/completion 
*  HTTP method POST
*/
(function execute(inputs, outputs) {
   /*
    * inputs.p_prompt
    * inputs.p_model_id
    * outputs.response
    * outputs.status_code
    * outputs.error_message
    */
   var target_rest_message = gs.getProperty('team_x.demo_app.ai_api.rest_message_name'); // 'Groq chat API'
   var rm = new sn_ws.RESTMessageV2(target_rest_message, 'CHAT');

        if (gs.nil(inputs.p_model_id)){
            inputs.p_model_id = gs.getProperty('team_x.demo_app.ai_api.model_id'); // deepseek-r1-distill-llama-70b
        }

        // Set the input parameters for the REST request
        rm.setStringParameter('prompt', inputs.p_prompt);
        rm.setStringParameter('model_id', inputs.p_model_id);

        // Execute the REST request
        var response = rm.execute();

        // Check if a response was received
        if (response) {
            // Get the HTTP status code
            var status = response.getStatusCode();
            outputs.status_code = status;
            outputs.response = response;

            // If successful (HTTP 200), return the response body
            if (status == 200) {
                 outputs.response = response.getBody();
            } else {
                // Log an error if the status code indicates failure
                outputs.error_message = 'Error calling Groq chat API: HTTP Status ' + status;
               
            }
        } else {
            // Log an error if no response was received
            outputs.error_message = 'No response from Groq chat API';
            
        }
})(inputs, outputs);
