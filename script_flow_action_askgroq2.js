/**
 * script step: parse response
 * flow action: integration - ai chatbot - call groq 
 * parse API response
 * api provider:  https://api.groq.com/openai/v1/chat/completions
 */

(function execute(inputs, outputs) {
// inputs.p_response
 // outputs.thinking
 // outputs.response


  // Parse the JSON string from the input
  var payload = JSON.parse(inputs.p_response);
  
  // Extract the content from the payload
  var content = payload.choices[0].message.content;
  
  // Define the regex pattern to match the thinking component
  var thinkPattern = /<think>\n([\s\S]*?)\n<\/think>/;
  
  // Attempt to match the pattern in the content
  var match = content.match(thinkPattern);
  
  if (match) {
    // Extract and trim the thinking component (captured group)
    outputs.thinking = match[1].trim();
    
    // Extract and trim the response text (everything after the matched pattern)
    var afterThink = content.substring(match.index + match[0].length).trim();
    outputs.response = afterThink;
  } else {
    // Fallback if no thinking component is found
    outputs.thinking = "";
    outputs.response = content;
  }
})(inputs, outputs);


