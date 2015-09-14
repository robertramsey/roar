Template.postsList.events({
  'click .postbox': function(e) {
    e.preventDefault();
    var image = $(".myImageUpload").get(0).files[0];
    var cdContent = $('.box').html();
    if (image !== undefined) {
    var upload = Images.insert(image);
    var post = {
      body: cdContent,
      image: "http://localhost:3000/cfs/files/images/" + upload._id,
      imageId: upload._id,
      profileImage: Meteor.user().profile.picture.image
    }
     } else {
      var post = {
      body: cdContent,
      profileImage: Meteor.user().profile.picture.image
     };
    }
    Meteor.call('postInsert', post);
    $('.box').html("");
  },
  'change .profileImageUpload': function(e) {
    e.preventDefault();
    var image = $(".profileImageUpload").get(0).files[0];
    var upload = Images.insert(image);
    var pic = {
      picture: "http://localhost:3000/cfs/files/images/" + upload._id
    }
    Meteor.call('updatePicture', pic);
  },
  'keydown .box': function(e) {
    var limit = 139;
    if(e.which != 8 && $('.box').text().length > limit) {
      e.preventDefault();
    }
  }
});