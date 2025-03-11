import React from 'react';
import Icon, { HomeOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import type { GetProps } from 'antd';

type CustomIconComponentProps = GetProps<typeof Icon>;

// 自定义图标 组件 全局

const HeartSvg = () => (
  <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 1024 1024">
    <title>heart icon</title>
    <path d="M923 283.6c-13.4-31.1-32.6-58.9-56.9-82.8-24.3-23.8-52.5-42.4-84-55.5-32.5-13.5-66.9-20.3-102.4-20.3-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5-24.4 23.9-43.5 51.7-56.9 82.8-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3 0.1-35.3-7-69.6-20.9-101.9z" />
  </svg>
);
const PandaSvg = () => (
  <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor">
    <title>Panda icon</title>
    <path
      d="M99.096 315.634s-82.58-64.032-82.58-132.13c0-66.064 33.032-165.162 148.646-148.646 83.37 11.91 99.096 165.162 99.096 165.162l-165.162 115.614zM924.906 315.634s82.58-64.032 82.58-132.13c0-66.064-33.032-165.162-148.646-148.646-83.37 11.91-99.096 165.162-99.096 165.162l165.162 115.614z"
      fill="#6B676E"
    />
    <path
      d="M1024 561.548c0 264.526-229.23 429.42-512.002 429.42S0 826.076 0 561.548 283.96 66.064 512.002 66.064 1024 297.022 1024 561.548z"
      fill="#FFEBD2"
    />
    <path
      d="M330.324 842.126c0 82.096 81.34 148.646 181.678 148.646s181.678-66.55 181.678-148.646H330.324z"
      fill="#E9D7C3"
    />
    <path
      d="M644.13 611.098C594.582 528.516 561.55 512 512.002 512c-49.548 0-82.58 16.516-132.13 99.096-42.488 70.814-78.73 211.264-49.548 247.742 66.064 82.58 165.162 33.032 181.678 33.032 16.516 0 115.614 49.548 181.678-33.032 29.18-36.476-7.064-176.93-49.55-247.74z"
      fill="#FFFFFF"
    />
    <path
      d="M611.098 495.484c0-45.608 36.974-82.58 82.58-82.58 49.548 0 198.194 99.098 198.194 165.162s-79.934 144.904-148.646 99.096c-49.548-33.032-132.128-148.646-132.128-181.678zM412.904 495.484c0-45.608-36.974-82.58-82.58-82.58-49.548 0-198.194 99.098-198.194 165.162s79.934 144.904 148.646 99.096c49.548-33.032 132.128-148.646 132.128-181.678z"
      fill="#6B676E"
    />
    <path
      d="M512.002 726.622c-30.06 0-115.614 5.668-115.614 33.032 0 49.638 105.484 85.24 115.614 82.58 10.128 2.66 115.614-32.944 115.614-82.58-0.002-27.366-85.556-33.032-115.614-33.032z"
      fill="#464655"
    />
    <path
      d="M330.324 495.484m-33.032 0a33.032 33.032 0 1 0 66.064 0 33.032 33.032 0 1 0-66.064 0Z"
      fill="#464655"
    />
    <path
      d="M693.678 495.484m-33.032 0a33.032 33.032 0 1 0 66.064 0 33.032 33.032 0 1 0-66.064 0Z"
      fill="#464655"
    />
  </svg>
);



// fill:currentColor 颜色由外部控制
const CopySvg = () => (
    <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-icon="SLIconCopy">
        <path d="M7.5 1.25c-.69 0-1.25.56-1.25 1.25v3.75H2.5c-.69 0-1.25.56-1.25 1.25v10c0 .69.56 1.25 1.25 1.25h10c.69 0 1.25-.56 1.25-1.25v-3.75h3.75c.69 0 1.25-.56 1.25-1.25v-10c0-.69-.56-1.25-1.25-1.25h-10Zm6.25 11V7.5c0-.69-.56-1.25-1.25-1.25H7.75v-3.5h9.5v9.5h-3.5Zm-11 5v-9.5h9.5v9.5h-9.5Z"></path>
    </svg>
)
const QuitSvg = () => (
  <svg width="1em" height="1em" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" data-icon="SLIconExit">
    <path d="M17.875 9.225a.1.1 0 0 0-.1-.1H8.427a.1.1 0 0 1-.07-.17l1.478-1.479a.1.1 0 0 0 0-.141l-.92-.92a.1.1 0 0 0-.141 0l-2.93 2.93a.75.75 0 0 0 0 1.06l2.93 2.93a.1.1 0 0 0 .141 0l.92-.92a.1.1 0 0 0 0-.14l-1.479-1.48a.1.1 0 0 1 .071-.17h9.348a.1.1 0 0 0 .1-.1v-1.3Zm-4.25-7.35a.75.75 0 0 0-.75-.75h-10a.75.75 0 0 0-.75.75v16c0 .414.336.75.75.75h10a.75.75 0 0 0 .75-.75v-2.4a.1.1 0 0 0-.1-.1h-1.3a.1.1 0 0 0-.1.1v1.55a.1.1 0 0 1-.1.1h-8.3a.1.1 0 0 1-.1-.1v-14.3a.1.1 0 0 1 .1-.1h8.3a.1.1 0 0 1 .1.1v1.05a.1.1 0 0 0 .1.1h1.3a.1.1 0 0 0 .1-.1v-1.9Z"></path>
  </svg>
)

const RemitSvg = () => (
  <svg width="1em" height="1em" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" data-icon="SLIconImport" font-size="18">
    <path d="M9.35 2a.1.1 0 0 0-.1.1v9.348a.1.1 0 0 1-.17.07L7.6 10.04a.1.1 0 0 0-.141 0l-.92.92a.1.1 0 0 0 0 .141l2.93 2.93a.75.75 0 0 0 1.06 0l2.93-2.93a.1.1 0 0 0 0-.141l-.92-.92a.1.1 0 0 0-.141 0l-1.478 1.479a.1.1 0 0 1-.171-.071V2.1a.1.1 0 0 0-.1-.1h-1.3ZM2 6.25a.75.75 0 0 0-.75.75v10c0 .414.336.75.75.75h16a.75.75 0 0 0 .75-.75V7a.75.75 0 0 0-.75-.75h-2.4a.1.1 0 0 0-.1.1v1.3a.1.1 0 0 0 .1.1h1.55a.1.1 0 0 1 .1.1v8.3a.1.1 0 0 1-.1.1H2.85a.1.1 0 0 1-.1-.1v-8.3a.1.1 0 0 1 .1-.1H3.9a.1.1 0 0 0 .1-.1v-1.3a.1.1 0 0 0-.1-.1H2Z"></path>
  </svg>
)

const ExportSvg = () => (
  <svg width="1em" height="1em" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="currentColor" data-icon="SLIconRedirect">
    <path d="M17 2.25h-5v1.5h3.19L9.47 9.47l1.06 1.06 5.72-5.72V8h1.5V3a.75.75 0 0 0-.75-.75Z"></path>
    <path d="M15.75 17v-6h-1.5v5.25H3.75V5.75H9v-1.5H3a.75.75 0 0 0-.75.75v12c0 .414.336.75.75.75h12a.75.75 0 0 0 .75-.75Z"></path>
  </svg>
)

const MistakeSvg = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" data-icon="SLIconFeedbackErrorOutlined">
    <path d="m14.958 16.236-2.964-2.963-2.963 2.963-1.273-1.272L10.72 12 7.758 9.036 9.03 7.764l2.963 2.963 2.964-2.963 1.273 1.272L13.267 12l2.964 2.964-1.273 1.272Z"></path><path d="M22.5 12c0 5.799-4.701 10.5-10.5 10.5S1.5 17.799 1.5 12 6.201 1.5 12 1.5 22.5 6.201 22.5 12Zm-1.8 0a8.7 8.7 0 1 0-17.4 0 8.7 8.7 0 0 0 17.4 0Z"></path>
  </svg>
)

const UnfoldSvg = () => (
  <svg width="1em" height="1em" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" data-icon="SLIconDown">
    <path d="m9.45 12.92-5-5 1.06-1.06 4.47 4.47 4.47-4.47 1.06 1.06-5 5a.75.75 0 0 1-1.06 0Z"></path>
  </svg>
)

const PositionSvg = () => (
  <svg width="1em" height="1em" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" data-icon="SLIconStoresLocation">
    <path d="M10 5.083a2.417 2.417 0 1 0 0 4.834 2.417 2.417 0 0 0 0-4.834ZM9.084 7.5a.917.917 0 1 1 1.833 0 .917.917 0 0 1-1.833 0Z"></path><path d="M5.345 2.845a6.583 6.583 0 1 1 9.31 9.31l-4.36 4.36a.417.417 0 0 1-.59 0l-4.36-4.36a6.583 6.583 0 0 1 0-9.31Zm8.25 1.06a5.083 5.083 0 0 0-7.19 7.19L10 14.688l3.595-3.595a5.083 5.083 0 0 0 0-7.188Z"></path><path d="M6.485 14.818a.185.185 0 0 0-.234-.026c-.623.415-1.167 1.047-1.167 1.875 0 1.012.8 1.727 1.635 2.143.878.44 2.04.69 3.281.69 1.242 0 2.403-.25 3.282-.69.834-.416 1.635-1.131 1.635-2.143 0-.828-.544-1.46-1.168-1.875a.186.186 0 0 0-.233.026l-.675.674c-.158.158-.109.425.077.549.423.281.499.515.499.626 0 .138-.132.465-.806.802-.63.315-1.551.53-2.61.53-1.06 0-1.982-.215-2.612-.53-.674-.337-.805-.664-.805-.802 0-.111.076-.345.498-.626.186-.124.235-.39.077-.549l-.674-.674Z"></path>
  </svg>
)

const FoldSvg = () => (
  <svg width="1em" height="1em" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" data-icon="SLIconUp">
    <path d="m9.45 7.08-5 5 1.06 1.06 4.47-4.47 4.47 4.47 1.06-1.06-5-5a.75.75 0 0 0-1.06 0Z"></path>
  </svg>
)

const DiscountedGraphSvg = () => (
  <svg width="1em" height="1em" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M1.68 1.6a.08.08 0 00-.08.08v12.64c0 .044.035.08.08.08h12.64a.08.08 0 00.08-.08v-1.06a.08.08 0 00-.08-.08H2.826a.08.08 0 01-.08-.08V1.68a.08.08 0 00-.08-.08H1.68z" fill="currentColor"></path><path d="M14.056 3.632l.736.735a.08.08 0 010 .113L9.68 9.592a.08.08 0 01-.114 0L7.281 7.305a.08.08 0 00-.114 0L4.905 9.567a.08.08 0 01-.113 0l-.736-.735a.08.08 0 010-.113l3.111-3.111a.08.08 0 01.114 0l2.286 2.287a.08.08 0 00.114 0l4.262-4.263a.08.08 0 01.113 0z" fill="currentColor"></path></svg>
)

const TemplateSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M1.742 2.492a.75.75 0 01.75-.75h14.862a.75.75 0 01.75.75v2.972a.75.75 0 01-.75.75H2.492a.75.75 0 01-.75-.75V2.492zm1.5.75v1.472h13.362V3.242H3.242zM8.678 8.436a.75.75 0 01.75-.75h7.926a.75.75 0 01.75.75v8.918a.75.75 0 01-.75.75H9.428a.75.75 0 01-.75-.75V8.436zm1.5.75v7.418h6.426V9.186h-6.426zM7.205 8.436a.75.75 0 00-.75-.75H2.492a.75.75 0 00-.75.75v8.918c0 .414.336.75.75.75h3.963a.75.75 0 00.75-.75V8.436zm-3.963.75h2.463v7.418H3.242V9.186z" fill="currentColor"></path>
  </svg>
)

const RiseSvg = () => (
  <svg width="1em" height="1em" viewBox="0 0 12 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg" data-icon="SLIconAnalyticsIncrease"><path d="M6.528.467a.75.75 0 0 0-1.055 0L.654 5.24 1.71 6.306l3.54-3.507V11.5h1.5V2.798l3.54 3.508 1.056-1.066L6.528.467Z"></path></svg>
)

const IdeaSvg = () => (
  <svg width="1em" height="1em" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M9.166 1.667h1.667v1.667H9.166V1.667zm-4.41 4.267L3.576 4.756l1.178-1.178 1.179 1.178-1.179 1.178zm10.488-2.356l1.178 1.178-1.178 1.178-1.178-1.178 1.178-1.178zM12.5 15v-1.232c1.216-.894 2.5-2.288 2.5-4.184C15 6.97 12.85 5 10 5 7.149 5 5 6.97 5 9.584c0 1.896 1.284 3.289 2.5 4.184V15a.833.833 0 00.833.834h3.333A.833.833 0 0012.5 15zm-1.667-1.666v.833H9.166v-.833a.834.834 0 00-.37-.694c-.971-.647-2.13-1.703-2.13-3.056 0-1.69 1.403-2.917 3.334-2.917 1.93 0 3.333 1.227 3.333 2.917 0 1.353-1.158 2.409-2.13 3.056a.834.834 0 00-.37.694zm-2.5 3.333h3.333v1.667H8.333v-1.667z"></path></svg>
)
const RightSvg = () => (
  <svg width="1em" height="1em" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="m12.86 9.47-5-5L6.8 5.53 11.27 10 6.8 14.47l1.06 1.06 5-5a.75.75 0 0 0 0-1.06Z"></path></svg>
)

const AddSvg = () => (
  <svg width="1em" height="1em" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
    <path d="M9.25 10.607v5.321h1.5v-5.321h5.321v-1.5H10.75V3.786h-1.5v5.32H3.93v1.5h5.32Z"></path>
  </svg>
)

const NailSvg = () => (
  <svg width="1em" height="1em" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="m18.039 7.866-5.902-5.9a.75.75 0 0 0-1.1.042L6.708 7.065 2.726 8.53a.75.75 0 0 0-.271 1.234l3.358 3.358-3.642 3.642a.1.1 0 0 0 0 .141l.92.92a.1.1 0 0 0 .14 0l3.642-3.642 3.367 3.367a.75.75 0 0 0 1.235-.272l1.463-3.984 5.058-4.328a.75.75 0 0 0 .043-1.1ZM7.72 8.189 11.65 3.6l4.755 4.755-4.591 3.928a.75.75 0 0 0-.216.31L10.47 15.66 4.345 9.533 7.41 8.406a.75.75 0 0 0 .31-.217Z"></path></svg>
)

const FaceBookSvg = () => (
  <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" data-icon="SLIconBrandFacebook">
    <g clip-path="url(#id-SLIconBrandFacebook-a)"><path d="M18 10c0 4.866-1.838 9.104-6.441 10H8.44C3.886 19.067 2 14.832 2 10c0-5.523 2.477-7.652 8-7.652s8 2.13 8 7.652Z" fill="#fff"></path><path d="M20 10.061C20 4.505 15.523 0 10 0S0 4.505 0 10.061C0 15.083 3.657 19.245 8.438 20v-7.03h-2.54V10.06h2.54V7.845c0-2.522 1.492-3.915 3.777-3.915 1.094 0 2.238.197 2.238.197v2.476h-1.26c-1.243 0-1.63.775-1.63 1.57v1.888h2.773l-.443 2.908h-2.33V20c4.78-.755 8.437-4.917 8.437-9.939Z" fill="#1877F2"></path></g><defs><clipPath id="id-SLIconBrandFacebook-a"><path fill="#fff" d="M0 0h20v20H0z"></path></clipPath></defs>
  </svg>
)

const AppleSvg = () => (
  <svg width="20" height="20" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#apple_svg__clip0_8018_2869)"><path d="M17.762 6.818c-.116.09-2.164 1.244-2.164 3.81 0 2.968 2.606 4.018 2.684 4.044-.012.064-.414 1.438-1.374 2.838-.856 1.232-1.75 2.462-3.11 2.462-1.36 0-1.71-.79-3.28-.79-1.53 0-2.074.816-3.318.816-1.244 0-2.112-1.14-3.11-2.54C2.934 15.814 2 13.26 2 10.836c0-3.888 2.528-5.95 5.016-5.95 1.322 0 2.424.868 3.254.868.79 0 2.022-.92 3.526-.92.57 0 2.618.052 3.966 1.984zm-4.68-3.63c.622-.738 1.062-1.762 1.062-2.786A1.92 1.92 0 0014.106 0c-1.012.038-2.216.674-2.942 1.516-.57.648-1.102 1.672-1.102 2.71 0 .156.026.312.038.362.064.012.168.026.272.026.908 0 2.05-.608 2.71-1.426z" fill="#000"></path></g><defs><clipPath id="apple_svg__clip0_8018_2869"><path fill="#fff" transform="translate(2)" d="M0 0h16.28v20H0z"></path></clipPath></defs></svg>
)

const PrintSvg = () => (
  <svg width="1em" height="1em" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.25 18H5.75V11.8184H14.25V18ZM7.875 16.4546H12.125V15.4234H7.875V16.4546ZM7.875 14.3941H12.125V13.3635H7.875V14.3941ZM4.6875 14.3941H2.5625C2.28071 14.3941 2.01046 14.2822 1.8112 14.0829C1.61194 13.8837 1.5 13.6134 1.5 13.3316V6.18367C1.5 5.90188 1.61194 5.63163 1.8112 5.43237C2.01046 5.23311 2.28071 5.12117 2.5625 5.12117H17.4375C17.7193 5.12117 17.9895 5.23311 18.1888 5.43237C18.3881 5.63163 18.5 5.90188 18.5 6.18367V13.3316C18.5 13.6134 18.3881 13.8837 18.1888 14.0829C17.9895 14.2822 17.7193 14.3941 17.4375 14.3941H15.3125V11.3352C15.3125 11.0534 15.2006 10.7832 15.0013 10.5839C14.802 10.3846 14.5318 10.2727 14.25 10.2727H5.75C5.46821 10.2727 5.19796 10.3846 4.9987 10.5839C4.79944 10.7832 4.6875 11.0534 4.6875 11.3352V14.3939V14.3941ZM4.15625 7.95459C4.14821 8.21884 4.21922 8.47948 4.36019 8.70313C4.50115 8.92679 4.70566 9.10328 4.94752 9.21003C5.18939 9.31677 5.45761 9.3489 5.71784 9.3023C5.97807 9.25571 6.21848 9.13251 6.40828 8.94848C6.59808 8.76444 6.72864 8.52795 6.78325 8.26928C6.83785 8.01061 6.81402 7.74153 6.71479 7.49649C6.61556 7.25144 6.44546 7.04159 6.22626 6.89379C6.00707 6.74599 5.74875 6.66697 5.48438 6.66684C5.13762 6.66194 4.80307 6.79476 4.5541 7.03616C4.30513 7.27756 4.16205 7.60785 4.15625 7.95459ZM5.21875 4.09081V1H15.3125V4.09081H5.21875Z"></path>
  </svg>
)

const DownloadSvg = () => (
  <svg width="1em" height="1em" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.9863 17.1992H4.98633C4.46875 17.1992 4.04883 16.7793 4.04883 16.2617C4.04883 15.7441 4.46875 15.3242 4.98633 15.3242H14.9863C15.5039 15.3242 15.9238 15.7441 15.9238 16.2617C15.9238 16.7793 15.5039 17.1992 14.9863 17.1992ZM12.1113 9.99609H7.86133C7.6543 9.99609 7.48633 9.82812 7.48633 9.62109V2.87109C7.48633 2.66406 7.6543 2.49609 7.86133 2.49609H12.1113C12.3184 2.49609 12.4863 2.66406 12.4863 2.87109V9.62109C12.4863 9.82812 12.3184 9.99609 12.1113 9.99609Z"></path><path d="M10.258 14.7246L15.5841 9.39844C15.8244 9.1582 15.6544 8.74414 15.3126 8.74414H4.66029C4.3185 8.74414 4.14858 9.15625 4.38881 9.39844L9.71498 14.7246C9.86537 14.875 10.1076 14.875 10.258 14.7246Z"></path>
  </svg>
)

const MailSvg = () => (
  <svg width="1em" height="1em" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 2.25c-.69 0-1.25.56-1.25 1.25v13c0 .69.56 1.25 1.25 1.25h15c.69 0 1.25-.56 1.25-1.25v-13c0-.69-.56-1.25-1.25-1.25h-15Zm.25 4.65V3.75h14.5V6.9l-.039-.092L10 9.812 2.788 6.808 2.75 6.9Zm0 1.517 6.721 2.8c.338.141.72.141 1.058 0l6.721-2.8v7.833H2.75V8.417Z"></path></svg>
)


const MailFilledSvg = () => (
  <svg width="1em" height="1em" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 14.6667C2 15.403 2.61052 16 3.36364 16H15.6364C16.3895 16 17 15.403 17 14.6667V7.43722L10.2212 10.7575C9.96998 10.8806 9.67601 10.8892 9.4177 10.7809L2 7.67256V14.6667Z"></path><path d="M2 5.64168L9.7624 8.8945L17 5.34944V5.33333C17 4.59695 16.3895 4 15.6364 4H3.36364C2.61052 4 2 4.59695 2 5.33333V5.64168Z"></path>
  </svg>
)











export const HeartIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={HeartSvg} {...props} />
);

export const PandaIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={PandaSvg} {...props} />
);

export const CopyIcon = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={CopySvg} {...props} />
);

export const QuitIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={QuitSvg} {...props} />
);

export const RemitIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={RemitSvg} {...props} />
);

export const ExportIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={ExportSvg} {...props} />
);

export const MistakeIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={MistakeSvg} {...props} />
);
export const UnfoldIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={UnfoldSvg} {...props} />
);
export const PositionIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={PositionSvg} {...props} />
);

export const AddIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={AddSvg} {...props} />
);

export const RightIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={RightSvg} {...props} />
);

export const FoldIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={FoldSvg} {...props} />
);

export const DiscountedGraphIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={DiscountedGraphSvg} {...props} />
);
export const TemplateIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={TemplateSvg} {...props} />
);

export const RiseIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={RiseSvg} {...props} />
);

export const IdeaIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={IdeaSvg} {...props} />
);

export const NailIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={NailSvg} {...props} />
);

export const FaceBookIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={FaceBookSvg} {...props} />
);

export const AppleIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={AppleSvg} {...props} />
);

export const PrintIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={PrintSvg} {...props} />
);

export const DownloadIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={DownloadSvg} {...props} />
);

export const MailIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={MailSvg} {...props} />
);

export const MailFilledIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={MailFilledSvg} {...props} />
);

