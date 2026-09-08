export const signup = (req, res) => {

    console.log(req.body);

    res.json({
        message: "Signup data received!"
    });

};