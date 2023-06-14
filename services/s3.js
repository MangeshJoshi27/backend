var AWS = require('aws-sdk');
AWS.config.update({
    "accessKeyId":process.env.accessKeyId,
    "secretAccessKey":process.env.secretAccessKey,
    "region":"ap-south-1"   
});
var s3Bucket = new AWS.S3( { params: {Bucket: 'pawspace'} } );

function fileUploadViaBase64(file_path,base64string)
{
    buf = Buffer.from(base64string.replace(/^data:image\/\w+;base64,/, ""),'base64')
    var data = {
        Key: file_path, 
        Body: buf,
        ACL: 'public-read',
        ContentEncoding: 'base64',
        ContentType: 'image/jpeg'
    };
    s3Bucket.putObject(data, function(err, data){
        if (err) { 
            return false;
        } else {
            return true;
        }
    });
}

async function deleteKey(file_path)
{
    var params = {  Bucket: 'pawspace', Key: file_path };
    s3Bucket.deleteObject(params, function(err, data) {
    if (err) 
        return err  
    else 
        return data      
    });
}

async function fileUploadViaMultipart(file_path,content,contentType)
{
    var data = {
        Key: file_path, 
        Body: content,
        ACL: 'public-read',
        ContentType: contentType
    };
    let get = await s3Bucket.putObject(data).promise();
    return get;
}

module.exports = 
{
    fileUploadViaBase64,
    deleteKey,
    fileUploadViaMultipart
}