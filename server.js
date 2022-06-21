const express = require('express');
const app = express();
const uploadFile = require('express-fileupload')
const cloudinary = require('cloudinary').v2;

app.set('view engine' , 'ejs');

// cloudinary config
cloudinary.config({
    cloud_name: 'dk81bsiz2',
    api_key:"334739518657796",
    api_secret:"9OxvjE_0mewIx-NNfeLVKd8U_C0"
})

const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// file upload
app.use(uploadFile({
    useTempFiles: true,
    tempFileDir:"/tmp/"
}));



app.get('/myget' , (req,res) => {
    console.log(req.query);
    res.json(req.query);
})

// file upload
app.post('/mypost',async (req,res) => {
   console.log(req.body);
   console.log(req.files);

    // uploading a single image to the cloudinary

    let file = req.files.samplefile;
    let result = await cloudinary.uploader.upload(file.tempFilePath,{
        folder: 'users'
    });
    console.log(result)

    //    let imgArr = [];
    //    if(req.files) {
    //     for (let index = 0; index < req.files.samplefile.length; index++) {
    //         try {
    //             let result = await cloudinary.uploader.upload(req.files.samplefile[index].tempFilePath , {folder: 'users'});
    //             imgArr.push({
    //                 public_id: result.public_id,
    //                 secure_url: result.secure_url
    //             })
    //         } catch(err) {
    //             console.log(err)
    //         }
        
    //     }
    //    }

   console.log(imgArr);


   let details = {
        firstName: req.body.firstname,
        lastName: req.body.lastName
   }


   res.json(details);
})

app.get('/myfirstget',(req,res) => {
    res.render('getform')
})

app.get('/myfirstpost',(req,res) => {
    res.render('postform')
})

app.listen(PORT , () => {
    console.log(`Server is listening at ${PORT}`);
})