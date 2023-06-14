exports.getAge = async (dateString) => {
    try{
        var ageInMilliseconds = new Date() - new Date(dateString);
        return (ageInMilliseconds/1000/60/60/24/365); // convert to years
    }catch (err) {
        return err
    }
}
