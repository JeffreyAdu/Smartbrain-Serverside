
const handleApiCall =( req, res) => {
    const {input} = req.body; 
    const returnClarifaiRequest = (inputInfo) => {
            // Your PAT (Personal Access Token) can be found in the portal under Authentification
            const PAT =  process.env.EPAT ;
            // Specify the correct user_id/app_id pairings
            // Since you're making inferences outside your app's scope
            const USER_ID = 'jeffrey';       
            const APP_ID = 'jeffreysapp';
            // Change these to whatever model and image URL you want to use
            
            const IMAGE_URL = inputInfo;

            const raw = JSON.stringify({
                "user_app_id": {
                    "user_id": USER_ID,
                    "app_id": APP_ID
                },
                "inputs": [
                    {
                        "data": {
                            "image": {
                                "url": IMAGE_URL
                            }
                        }
                    }
                ]
            });
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Key ' + PAT
                },
                body: raw
            };
        return requestOptions;    

    }
    const MODEL_ID = 'face-detection';                  
    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID  + "/outputs" , returnClarifaiRequest(input) )
    .then(response => response.json())
    .then(data => res.json(data))
    .catch(err => {res.status(400).json("Something isnt working")})
        
            
        
}





const handleImage = (req, res, db) => {
    const {id} = req.body;
    db('users').where('id', '=', id).increment(
        'entries', 1
    ).returning('entries')
    .then(entries=> res.json(entries[0].entries))
    .catch(err => res.status(400).json("Unable to get entries"));

}


module.exports= {
    handleImage,
    handleApiCall
}