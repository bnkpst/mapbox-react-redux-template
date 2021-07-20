
import {TITLE, VERSION} from "../config";

const Header = () => {

    return(
        <div className='flex flex--row flex--space-between-main px18 my12 pt6'>
            <div className='txt-bold'>{TITLE}</div>
            <div>{VERSION}</div>
        </div>
    )
}

const Container = (props) => {

    return(
        <div  className='px18 pt6 scroll-container'>
            {props.children}
        </div>
    )
}

const Sidebar = (props) => {

    return(
        <div>
            <Header></Header>
            <Container>
                {props.children}
            </Container>
        </div>
    )
}

export default Sidebar;