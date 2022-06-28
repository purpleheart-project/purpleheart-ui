import AppGitHubStarButton from "./GitHubStarButton";
import './Header.less'
import {Avatar, Button, Divider} from "antd";
import {useLocation, useNavigate, useRoutes} from "react-router-dom";
import {DownloadOutlined, UserAddOutlined} from "@ant-design/icons";
const AppHeader = () => {
    const to = useNavigate()
  return <div className={'app-header'}>
      <div className={'left'}>
          <a className={'app-name'} onClick={()=>{to('/')}}>
              AREX
          </a>
          <AppGitHubStarButton></AppGitHubStarButton>
      </div>

      <div className={'right'}>
          <Button type="primary" icon={<UserAddOutlined />} style={{marginRight:'16px'}}>
              邀请
          </Button>
          <Avatar src="https://joeschmoe.io/api/v1/random" size={20} style={{marginRight:'8px'}}/>
      </div>
  </div>
}

export default AppHeader
