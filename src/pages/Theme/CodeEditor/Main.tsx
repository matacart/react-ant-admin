import { CloseOutlined } from "@ant-design/icons";
import { Flex, Tabs, TabsProps } from "antd";
import styled from "styled-components";
import { useEffect, useState } from 'react';
import codeEditor from "@/store/theme/codeEditor";
import { observer } from "mobx-react-lite";
import { useLocation, useParams } from "react-router-dom";
import MyMonacoEditor from "./MyMonacoEditor";

interface FileType{
  key:string,
  title:string,
  url:string,
}

function Main(){

    const searchParams = new URLSearchParams(useLocation().search);

    const [items,setItems] = useState([]);
    // key 当前文件
    useEffect(()=>{
      // 所有文件
      const newItems = codeEditor.openFileList.map((file:FileType)=>{
        return {
          key: file.key,
          label: <Flex gap={8} style={{padding: '2px 12px'}} >
            <div className="title">{file.title}</div>
            <div onClick={(e)=>{
              e.stopPropagation();
              // 移除文件
              // console.log('remove',file.key)
              // 当前文件下标
              const currentIndex = codeEditor.openFileList.findIndex((f: FileType) => f.key === file.key);
              // 剩余文件
              const newOpenFileList = codeEditor.openFileList.filter((item: FileType) => item.key !== file.key);
              codeEditor.setOpenFileList(newOpenFileList)
              // 激活文件偏移
              if(codeEditor.activeFileKey == file.key){
                if(newOpenFileList[currentIndex-1]?.key){
                  codeEditor.setActiveFileKey(newOpenFileList[currentIndex-1].key)
                }else{
                  codeEditor.setActiveFileKey(newOpenFileList[0]?.key || "")
                }
              }
            }}>
              <CloseOutlined className="close-icon" />
            </div>
          </Flex>,
          children: <MyMonacoEditor file={file} />,
        }
      })
      setItems(newItems)
    },[codeEditor.openFileList])

    return(
        <Scoped>
            {codeEditor.activeFileKey == "" ? <>
              <div style={{height:"58px",borderBottom:"1px solid #d7dbe7"}}></div>
              <div className="not-open">
                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjk0IiBoZWlnaHQ9IjIyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxNDMiIGN5PSIxMTAiIHI9IjkwIiBmaWxsPSIjRThGMkZGIi8+PGcgZmlsdGVyPSJ1cmwoI2EpIj48Y2lyY2xlIGN4PSIxNDMiIGN5PSIxMTAiIHI9IjcwIiBmaWxsPSIjRTlGMUZFIi8+PC9nPjxnIGZpbHRlcj0idXJsKCNiKSI+PHJlY3QgeD0iNjMiIHk9IjQxIiB3aWR0aD0iMTYwIiBoZWlnaHQ9IjEzMiIgcng9IjIiIGZpbGw9IiNmZmYiLz48L2c+PHBhdGggZD0iTTYzIDQzYTIgMiAwIDAgMSAyLTJoMTU2YTIgMiAwIDAgMSAyIDJ2NDJINjNWNDNaIiBmaWxsPSJ1cmwoI2MpIi8+PHJlY3QgeD0iMTE1IiB5PSI5MSIgd2lkdGg9IjEwMiIgaGVpZ2h0PSI3NiIgcng9IjIiIGZpbGw9IiNGMkYzRjYiLz48cmVjdCB4PSI2OSIgeT0iMTI5IiB3aWR0aD0iNDAiIGhlaWdodD0iMzgiIHJ4PSIyIiBmaWxsPSIjRjRGNUY4Ii8+PGNpcmNsZSBjeD0iNzEiIGN5PSI0OSIgcj0iMiIgZmlsbD0iIzRENTY3NyIvPjxjaXJjbGUgY3g9Ijc4IiBjeT0iNDkiIHI9IjIiIGZpbGw9IiM0RDU2NzciLz48Y2lyY2xlIGN4PSI4NSIgY3k9IjQ5IiByPSIyIiBmaWxsPSIjNEQ1Njc3Ii8+PHJlY3QgeD0iNzgiIHk9IjU5IiB3aWR0aD0iNjEiIGhlaWdodD0iMTAiIHJ4PSIyIiBmaWxsLW9wYWNpdHk9Ii4wOCIvPjxyZWN0IHg9IjExOSIgeT0iOTciIHdpZHRoPSI2MSIgaGVpZ2h0PSI0IiByeD0iMSIgZmlsbD0iI0U2RTZFNiIvPjxyZWN0IHg9IjExOSIgeT0iMTM1IiB3aWR0aD0iNDQiIGhlaWdodD0iNCIgcng9IjEiIGZpbGw9IiNFNkU2RTYiLz48cmVjdCB4PSIxMTkiIHk9IjEwNSIgd2lkdGg9IjQzIiBoZWlnaHQ9IjIiIHJ4PSIxIiBmaWxsPSIjRUFFQUVBIi8+PHJlY3QgeD0iMTE5IiB5PSIxMTMiIHdpZHRoPSIxNyIgaGVpZ2h0PSIyIiByeD0iMSIgZmlsbD0iI0VBRUFFQSIvPjxyZWN0IHg9IjExOSIgeT0iMTA5IiB3aWR0aD0iMzYiIGhlaWdodD0iMiIgcng9IjEiIGZpbGw9IiNFQUVBRUEiLz48cmVjdCB4PSIxMTkiIHk9IjExNyIgd2lkdGg9IjM2IiBoZWlnaHQ9IjIiIHJ4PSIxIiBmaWxsPSIjRUFFQUVBIi8+PHJlY3QgeD0iMTE5IiB5PSIxNDMiIHdpZHRoPSI1NiIgaGVpZ2h0PSIyIiByeD0iMSIgZmlsbD0iI0VBRUFFQSIvPjxyZWN0IHg9IjExOSIgeT0iMTUxIiB3aWR0aD0iMTciIGhlaWdodD0iMiIgcng9IjEiIGZpbGw9IiNFQUVBRUEiLz48cmVjdCB4PSIxMTkiIHk9IjE0NyIgd2lkdGg9IjM2IiBoZWlnaHQ9IjIiIHJ4PSIxIiBmaWxsPSIjRUFFQUVBIi8+PHJlY3QgeD0iMTE5IiB5PSIxNTUiIHdpZHRoPSIzNiIgaGVpZ2h0PSIyIiByeD0iMSIgZmlsbD0iI0VBRUFFQSIvPjxnIGZpbHRlcj0idXJsKCNkKSI+PHBhdGggZD0iTTUwIDc0YTIgMiAwIDAgMSAyLTJoNTBhMiAyIDAgMCAxIDIgMnY4NmEyIDIgMCAwIDEtMiAySDUyYTIgMiAwIDAgMS0yLTJWNzRaIiBmaWxsPSIjZmZmIi8+PC9nPjxyZWN0IG9wYWNpdHk9Ii41IiB4PSI1NCIgeT0iODAiIHdpZHRoPSIzMCIgaGVpZ2h0PSI2IiByeD0iMiIgZmlsbD0iIzdGOEZCOSIgZmlsbC1vcGFjaXR5PSIuNzIiLz48cmVjdCBvcGFjaXR5PSIuNSIgeD0iNTQiIHk9IjEyMCIgd2lkdGg9IjMwIiBoZWlnaHQ9IjYiIHJ4PSIyIiBmaWxsPSIjN0Y4RkI5IiBmaWxsLW9wYWNpdHk9Ii43MiIvPjxyZWN0IHg9IjU0IiB5PSIxNDAiIHdpZHRoPSIyMSIgaGVpZ2h0PSIzIiByeD0iMS41IiBmaWxsPSIjRUFFRUY2Ii8+PHJlY3QgeD0iNTQiIHk9Ijk1IiB3aWR0aD0iMjYiIGhlaWdodD0iMyIgcng9IjEuNSIgZmlsbD0iI0VBRUVGNiIvPjxyZWN0IHg9IjU0IiB5PSIxMzUiIHdpZHRoPSI0MyIgaGVpZ2h0PSIzIiByeD0iMS41IiBmaWxsPSIjRUFFRUY2Ii8+PHJlY3QgeD0iNTQiIHk9IjEwMCIgd2lkdGg9IjQzIiBoZWlnaHQ9IjMiIHJ4PSIxLjUiIGZpbGw9IiNFQUVFRjYiLz48cmVjdCB4PSI1NCIgeT0iMTA1IiB3aWR0aD0iMzUiIGhlaWdodD0iMyIgcng9IjEuNSIgZmlsbD0iI0VBRUVGNiIvPjxnIGZpbHRlcj0idXJsKCNlKSI+PHBhdGggZD0iTTE5MCA3M2EyIDIgMCAwIDEgMi0yaDUwYTIgMiAwIDAgMSAyIDJ2MzEuNjE3YTIgMiAwIDAgMS0yIDJoLTUwYTIgMiAwIDAgMS0yLTJWNzNaIiBmaWxsPSIjZmZmIi8+PC9nPjxwYXRoIGQ9Im0yMzQuODQxIDg4LjA5Mi03LjE2Ny03LjI5MWEyLjAzOSAyLjAzOSAwIDAgMC0xLjQyLS41MDIgMi4wNCAyLjA0IDAgMCAwLTEuMzc2LjYxMiAyLjExMiAyLjExMiAwIDAgMC0uNjAyIDEuNGMtLjAyLjUyOC4xNTYgMS4wNDMuNDk0IDEuNDQ0bDUuNzA1IDUuODI1LTUuNzI2IDUuODI1YTIuMTE5IDIuMTE5IDAgMCAwLS41NzggMi4zNTYgMi4wNjMgMi4wNjMgMCAwIDAgMS4xNjYgMS4xODcgMi4wMzQgMi4wMzQgMCAwIDAgMi4zMTYtLjU4OWw3LjE2OC03LjI5MWEyLjExNiAyLjExNiAwIDAgMCAuNDY2LTIuMjkgMi4wOCAyLjA4IDAgMCAwLS40NDYtLjY4NlptLTIzLjgwOS03LjI5MWEyLjA0MiAyLjA0MiAwIDAgMC0xLjQ1Mi0uNjFjLS41NDUgMC0xLjA2Ny4yMi0xLjQ1My42MWwtNy4xODggNy4yOTFhMi4xMTcgMi4xMTcgMCAwIDAgMCAyLjk1NWw3LjE2OCA3LjI5MWMuMzk0LjM0My45MDEuNTIzIDEuNDE5LjUwM2EyLjA0NSAyLjA0NSAwIDAgMCAxLjM3Ny0uNjEzIDIuMTIgMi4xMiAwIDAgMCAuMTA4LTIuODQ0bC01LjY4NS01LjgwNCA1LjcwNi01LjgyNWEyLjExNiAyLjExNiAwIDAgMCAwLTIuOTU0Wm05Ljc0Mi0uNDYxYTIuMDI4IDIuMDI4IDAgMCAwLTEuNTgxLjA1NmMtLjI0Ny4xMTUtLjQ3LjI3OC0uNjU0LjQ4LS4xODUuMjAzLS4zMjguNDQtLjQyMi43bC01LjI5MyAxNC41NDFhMi4xMjMgMi4xMjMgMCAwIDAgLjQ1NyAyLjM1NyAyLjAyOSAyLjAyOSAwIDAgMCAyLjMzNC4zNyAyLjA4MSAyLjA4MSAwIDAgMCAxLjA2LTEuMjZsNS4yOTMtMTQuNTQxYTIuMTMgMi4xMyAwIDAgMC0uMDQ3LTEuNjAzIDIuMDc4IDIuMDc4IDAgMCAwLTEuMTQ3LTEuMVpNOTguMjIyIDE0NS41MzdjLS4zODItMS42NTUgMS4zNDItMy4wMDIgMi44NTYtMi4yMzJsMjcuMDQxIDEzLjc2NGMxLjYyOC44MjkgMS4zODUgMy4yMjctLjM3NiAzLjcxMWwtMTEuNzk2IDMuMjQ2YTIgMiAwIDAgMC0xLjIxMi45NDhsLTYuMDAxIDEwLjY2MWMtLjg5NiAxLjU5Mi0zLjI4MiAxLjI0OC0zLjY5Mi0uNTMxbC02LjgyLTI5LjU2N1oiIGZpbGw9IiMzNzZERjciLz48cmVjdCB4PSIxMTAuNjk5IiB5PSIxNjQuNDE2IiB3aWR0aD0iNy4yMTEiIGhlaWdodD0iMTYuODI3IiByeD0iMS41IiB0cmFuc2Zvcm09InJvdGF0ZSgtMzguMDA2IDExMC42OTkgMTY0LjQxNikiIGZpbGw9IiMzNzZERjciLz48ZGVmcz48ZmlsdGVyIGlkPSJhIiB4PSIzMyIgeT0iMCIgd2lkdGg9IjIyMCIgaGVpZ2h0PSIyMjAiIGZpbHRlclVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgY29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzPSJzUkdCIj48ZmVGbG9vZCBmbG9vZC1vcGFjaXR5PSIwIiByZXN1bHQ9IkJhY2tncm91bmRJbWFnZUZpeCIvPjxmZUJsZW5kIGluPSJTb3VyY2VHcmFwaGljIiBpbjI9IkJhY2tncm91bmRJbWFnZUZpeCIgcmVzdWx0PSJzaGFwZSIvPjxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjIwIiByZXN1bHQ9ImVmZmVjdDFfZm9yZWdyb3VuZEJsdXIiLz48L2ZpbHRlcj48ZmlsdGVyIGlkPSJiIiB4PSIyMyIgeT0iNSIgd2lkdGg9IjI0MCIgaGVpZ2h0PSIyMTIiIGZpbHRlclVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgY29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzPSJzUkdCIj48ZmVGbG9vZCBmbG9vZC1vcGFjaXR5PSIwIiByZXN1bHQ9IkJhY2tncm91bmRJbWFnZUZpeCIvPjxmZUNvbG9yTWF0cml4IGluPSJTb3VyY2VBbHBoYSIgdmFsdWVzPSIwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAxMjcgMCIvPjxmZU9mZnNldCBkeT0iNCIvPjxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjIwIi8+PGZlQ29sb3JNYXRyaXggdmFsdWVzPSIwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwLjA4IDAiLz48ZmVCbGVuZCBpbjI9IkJhY2tncm91bmRJbWFnZUZpeCIgcmVzdWx0PSJlZmZlY3QxX2Ryb3BTaGFkb3ciLz48ZmVCbGVuZCBpbj0iU291cmNlR3JhcGhpYyIgaW4yPSJlZmZlY3QxX2Ryb3BTaGFkb3ciIHJlc3VsdD0ic2hhcGUiLz48L2ZpbHRlcj48ZmlsdGVyIGlkPSJkIiB4PSIwIiB5PSIyOCIgd2lkdGg9IjE1NCIgaGVpZ2h0PSIxOTAiIGZpbHRlclVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgY29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzPSJzUkdCIj48ZmVGbG9vZCBmbG9vZC1vcGFjaXR5PSIwIiByZXN1bHQ9IkJhY2tncm91bmRJbWFnZUZpeCIvPjxmZUNvbG9yTWF0cml4IGluPSJTb3VyY2VBbHBoYSIgdmFsdWVzPSIwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAxMjcgMCIvPjxmZU9mZnNldCBkeT0iNiIvPjxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjI1Ii8+PGZlQ29sb3JNYXRyaXggdmFsdWVzPSIwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwLjA4IDAiLz48ZmVCbGVuZCBpbjI9IkJhY2tncm91bmRJbWFnZUZpeCIgcmVzdWx0PSJlZmZlY3QxX2Ryb3BTaGFkb3ciLz48ZmVCbGVuZCBpbj0iU291cmNlR3JhcGhpYyIgaW4yPSJlZmZlY3QxX2Ryb3BTaGFkb3ciIHJlc3VsdD0ic2hhcGUiLz48L2ZpbHRlcj48ZmlsdGVyIGlkPSJlIiB4PSIxNDAiIHk9IjI3IiB3aWR0aD0iMTU0IiBoZWlnaHQ9IjEzNS42MTciIGZpbHRlclVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgY29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzPSJzUkdCIj48ZmVGbG9vZCBmbG9vZC1vcGFjaXR5PSIwIiByZXN1bHQ9IkJhY2tncm91bmRJbWFnZUZpeCIvPjxmZUNvbG9yTWF0cml4IGluPSJTb3VyY2VBbHBoYSIgdmFsdWVzPSIwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAxMjcgMCIvPjxmZU9mZnNldCBkeT0iNiIvPjxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjI1Ii8+PGZlQ29sb3JNYXRyaXggdmFsdWVzPSIwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwLjEyIDAiLz48ZmVCbGVuZCBpbjI9IkJhY2tncm91bmRJbWFnZUZpeCIgcmVzdWx0PSJlZmZlY3QxX2Ryb3BTaGFkb3ciLz48ZmVCbGVuZCBpbj0iU291cmNlR3JhcGhpYyIgaW4yPSJlZmZlY3QxX2Ryb3BTaGFkb3ciIHJlc3VsdD0ic2hhcGUiLz48L2ZpbHRlcj48bGluZWFyR3JhZGllbnQgaWQ9ImMiIHgxPSI2MyIgeTE9IjYzIiB4Mj0iMjIzIiB5Mj0iNjMiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBzdG9wLWNvbG9yPSIjNTk2NDdDIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjN0E4NDk5Ii8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PC9zdmc+" />
                <div className="tip">从左侧边栏中选择一个文件以开始编辑</div>
              </div>
            </>:<Tabs 
                activeKey={codeEditor.activeFileKey}
                tabBarGutter={0} 
                items={items} 
                onChange={(activeKey:string)=>{
                  codeEditor.setActiveFileKey(activeKey)
                }}
            />}
        </Scoped>
    )
}

const Scoped = styled.div`
    .not-open{
      text-align: center;
      padding-top: 50px;
      .emptyImg{
        
      }
      .tip{
        margin-top: 52px;
        font-size: 20px;
        font-weight: 600;
      }
    }

    .ant-tabs-nav{
      margin: 0;
    }
    .ant-tabs-nav::before{
        border-bottom: 1px solid #d7dbe7;
    }
    .close-icon{
        color: #7A8499;
        :hover{
            color: #474F5E;
        }
    }
    
`
export default observer(Main);