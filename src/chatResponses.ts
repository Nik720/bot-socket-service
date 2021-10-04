export const jsonData = {
    "default": {
      "text": "Hi, I'm Tara, May I help you? Reply with a number from to the options shown to explore further",
      "choices": [
        {"text": "1 Your Education Boards", "value": "1"},
        {"text": "2 Comic books", "value": "2"},
        {"text": "3 DIKSHA mobile app", "value": "3"},
        {"text": "4 DIKSHA queries", "value": "4"},
      ]
    },
    "1": {
      "text": "Reply with a number from the options shown to explore further",
      "choices": [
        {"text": "1 Andhra Pradesh", "value": "ds_andhrapradesh"},
        {"text": "2 Assam", "value": "ds_assam"},
        {"text": "3 Bihar", "value": "ds_bihar"},
        {"text": "4 Chandigarh", "value": "ds_chandigarh"},
        {"text": "Go Back", "value": "#"},
        {"text": "Main Menu", "value": "*"}
      ]
    },
    "ds_andhrapradesh": {
      "text": "What would you like to explore?  Reply with a number from the options shown to explore further:",
      "choices": [
        {"text": "1 Digital content", "value": "digitalContent"},
        {"text": "2 Course", "value": "course"}
      ]
    },
    "ds_assam": {
      "text": "What would you like to explore?  Reply with a number from the options shown to explore further:",
      "choices": [
        {"text": "1 Digital content", "value": "digitalContent"},
        {"text": "2 Course", "value": "course"}
      ]
    },
    "ds_bihar": {
      "text": "What would you like to explore?  Reply with a number from the options shown to explore further:",
      "choices": [
        {"text": "1 Digital content", "value": "digitalContent"},
        {"text": "2 Course", "value": "course"},
        {"text": "Go Back", "value": "#"},
        {"text": "Main Menu", "value": "*"}
      ]
    },
    "ds_chandigarh": {
      "text": "What would you like to explore?  Reply with a number from the options shown to explore further:",
      "choices": [
        {"text": "1 Digital content", "value": "digitalContent"},
        {"text": "2 Course", "value": "course"},{"text": "Go Back", "value": "#"},
        {"text": "Main Menu", "value": "*"}
      ]
    },
    "digitalContent": {
      "text": "Please visit: DIKSHA CBSE Select the Medium and Class to view relevant subject textbook on the board website.",
      "choices": [{"text": "Go Back", "value": "#"},
      {"text": "Main Menu", "value": "*"}]
    },
    "course": {
      "text": "Please visit:DIKSHA CBSE COURSE Select the Topic, Medium, Class and Subject to view relevant course on the website.",
      "choices": [{"text": "Go Back", "value": "#"},
      {"text": "Main Menu", "value": "*"}]
    }
  }