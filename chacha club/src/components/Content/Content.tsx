import {StyledContent} from "./ContentStyles.ts";

const Content = ({children}) => {
    return (
        <StyledContent>
            {children}
        </StyledContent>
    )
}

export default Content;