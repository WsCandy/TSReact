import { RouteComponentProps } from "react-router";
import Context from "@common/model/routing/Context";

interface RouteProps extends RouteComponentProps<{}, Context> {}

export default RouteProps;
