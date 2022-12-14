const newPostFormHandler = async event => {
    event.preventDefault();

    const contents = document.querySelector('#newpost-text').value.trim();
    console.log(contents);

    if (contents) {
      try{
        let response = await fetch('/api/posts', {
          method: 'POST',
          body: JSON.stringify({contents}),
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
          document.location.replace('/');
        } else {
          response = await response.json();
          alert(`Failed to log in. ${response.message}`);
        }
      }
      catch (err){
        console.log(err);
      }
    }
  };

  document.querySelector('#newpost-submit').addEventListener('click', newPostFormHandler);