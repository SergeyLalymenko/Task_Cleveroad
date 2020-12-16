import { createMuiTheme } from '@material-ui/core'
import blue from '@material-ui/core/colors/blue'
import red from '@material-ui/core/colors/red'



export default (darkMode) => createMuiTheme({
    palette: {
        type: darkMode ? 'dark' : 'light',
        primary: {
           main: blue[400],
        },
        secondary: {
            main: red[400],
        },
    }
})