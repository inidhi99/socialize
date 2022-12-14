const notificationHandler = async (notificationId, postId, event) => {
  event.stopPropagation();
  try {
    const response = await fetch(`/api/notifications/${notificationId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        read_flag: true 
      }),
    })

const data = await fetch(`/api/posts/${postId}`)
const post = await data.json()
const element= $("<div>")
$(`#notification${notificationId}`).parent().append(element)
loadPost(post, element);
  } catch (err) {
    console.log(err);
  }
};

const allNotifications = document.querySelectorAll('.nidhi');

allNotifications.forEach(function(el) {
  el.addEventListener('click', notificationHandler.bind(this,  $(el).attr('notificationId'), $(el).attr('postId')));
});
  
document.addEventListener('DOMContentLoaded', () => {
    (document.querySelectorAll('.notification .delete') || []).forEach(($delete) => {
      const $notification = $delete.parentNode;
      $delete.addEventListener('click', () => {
        $notification.parentNode.removeChild($notification);
        document.location.replace('/notifications');
      });
    });
  }
  );

function loadPost (post, element) {
const {contents, totalLikes, totalDislikes, totalComments, id } = post
  $(element).html( `
<div class="notification-modal" id="notification-style">
 <div class="modal-background"></div>
  <div class="modal-content bboyz">
   <div class="box">
      <button class="delete" style="float: right;" onClick="window.location.reload();" type="button" ></button>
      <p>${contents}</p> <br>
      <div class="notification-span">
        <span>${totalComments}</span>
        <i class="fa-solid fa-comment notified" postid="${id}"></i>
        <span>${totalLikes}</span>
        <i class="fa-solid fa-thumbs-up thumbs-up{{@index}} notified" postid="${id}}"></i> 
        <span>${totalDislikes} </span>
        <i class="fa-solid fa-thumbs-down thumbs-down{{@index}} notified" postid="${id}"></i>
      </div>
   </div>
  </div>
</div>
`)};

function refreshPage(){
  window.location.reload();
} 
