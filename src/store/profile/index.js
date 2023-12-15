import StoreModule from "../module";

class ProfileState extends StoreModule {
  initState() {
    return {
      username: '',
      email: '',
      phone: '',
      profileError: null,
      waiting: false
    };
  }

  async profile() {
    this.setState({waiting: true});
    try {
      const response = await fetch('/api/v1/users/self?fields=*', {
        method: 'GET',
        headers: {
          'X-Token': localStorage.getItem('token'),
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        new Error('Profile failed');
      }

      const responseJson = await response.json();
      console.log(responseJson)
      this.setState({
        ...this.getState(),
        username: responseJson.result.profile.name,
        email: responseJson.result.email,
        phone: responseJson.result.profile.phone,
        waiting: false
      })

    } catch (error) {
      this.setState({
        profileError: error.message,
        waiting: false
      })
    }
  }
}

export default ProfileState;
