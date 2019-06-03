import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CartMicro from './CartMicro';
import { connect } from 'react-redux';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 400,
    fontSize: '16px !important',
    display: 'block',
  },
  root: {
    width: '900px',
    margin: '100px auto 0',
    display: 'flex',
    justifyContent: 'space-around',
  },
  button: {
    marginTop: 15,
  }
});

class ConvertXml extends React.Component {
  state = {
    file: null,
  }

  onChange = e => {
   let file = e.target.files[0]
   this.setState({file})
  }

  sendFetch = () => {
    const formData = new FormData();
    formData.append("items_import[file]", this.state.file);
    var myInit = {
    method: 'POST',
    body: formData,
    headers: {
      Accept: "text/html,application/xhtml+xml,application/xml;" +
      "q=0.9,image/webp,image/apng,*/*",
    },
  }
    fetch("/items_imports", myInit)
    .then(res => res.json())
    .then(data => this.setState({data}))
  }

  sendOrder = () => {
    fetch('/users', {
     method: 'post',
     headers: {'Content-Type':'application/json'},
     body: JSON.stringify({user: {email: this.state.email, password: this.state.password, password_confirmation: this.state.password_confirmation}}),
   })
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <form noValidate autoComplete="off"  >
          <div className={classes.title}>
            ковертировать ексель
          </div>
          <input type="file" name="file" onChange={this.onChange} />
          <Button variant="contained" className={classes.button} onClick={this.sendFetch} color="primary">
            Конвертировать
          </Button>
        </form>
      </div>

    );
  }
}

ConvertXml.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ConvertXml)
