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

const AddSvg = () => (
  <svg viewBox="64 64 896 896" focusable="false" data-icon="plus" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z"></path><path d="M192 474h672q8 0 8 8v60q0 8-8 8H160q-8 0-8-8v-60q0-8 8-8z"></path></svg>
)

const FaceBookSvg = () => (
  <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" data-icon="SLIconBrandFacebook">
    <g clip-path="url(#id-SLIconBrandFacebook-a)"><path d="M18 10c0 4.866-1.838 9.104-6.441 10H8.44C3.886 19.067 2 14.832 2 10c0-5.523 2.477-7.652 8-7.652s8 2.13 8 7.652Z" fill="#fff"></path><path d="M20 10.061C20 4.505 15.523 0 10 0S0 4.505 0 10.061C0 15.083 3.657 19.245 8.438 20v-7.03h-2.54V10.06h2.54V7.845c0-2.522 1.492-3.915 3.777-3.915 1.094 0 2.238.197 2.238.197v2.476h-1.26c-1.243 0-1.63.775-1.63 1.57v1.888h2.773l-.443 2.908h-2.33V20c4.78-.755 8.437-4.917 8.437-9.939Z" fill="#1877F2"></path></g><defs><clipPath id="id-SLIconBrandFacebook-a"><path fill="#fff" d="M0 0h20v20H0z"></path></clipPath></defs>
  </svg>
)

const AppleSvg = () => (
  <svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#apple_svg__clip0_8018_2869)"><path d="M17.762 6.818c-.116.09-2.164 1.244-2.164 3.81 0 2.968 2.606 4.018 2.684 4.044-.012.064-.414 1.438-1.374 2.838-.856 1.232-1.75 2.462-3.11 2.462-1.36 0-1.71-.79-3.28-.79-1.53 0-2.074.816-3.318.816-1.244 0-2.112-1.14-3.11-2.54C2.934 15.814 2 13.26 2 10.836c0-3.888 2.528-5.95 5.016-5.95 1.322 0 2.424.868 3.254.868.79 0 2.022-.92 3.526-.92.57 0 2.618.052 3.966 1.984zm-4.68-3.63c.622-.738 1.062-1.762 1.062-2.786A1.92 1.92 0 0014.106 0c-1.012.038-2.216.674-2.942 1.516-.57.648-1.102 1.672-1.102 2.71 0 .156.026.312.038.362.064.012.168.026.272.026.908 0 2.05-.608 2.71-1.426z" fill="#000"></path></g><defs><clipPath id="apple_svg__clip0_8018_2869"><path fill="#fff" transform="translate(2)" d="M0 0h16.28v20H0z"></path></clipPath></defs></svg>
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

export const FoldIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={FoldSvg} {...props} />
);

export const FaceBookIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={FaceBookSvg} {...props} />
);

export const AppleIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={AppleSvg} {...props} />
);
