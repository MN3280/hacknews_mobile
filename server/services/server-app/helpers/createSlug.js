
const slugify = (title) => {
    // hasil akhirnya adalah: "ini-cuman-halo-dunia";
    return title.split(" ").join("-").toLocaleLowerCase()
};




module.exports = { slugify } 