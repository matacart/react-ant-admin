export default function Nothing() {
  return (
    <div style={{
        marginTop: '100px',
        marginBottom: '100px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }}>
      <img src="https://cdn.myshopline.com/sl/admin/ec2-admin-shell/20240514094846440/imgs/filter-empty.6a113.svg" alt=""></img>
      <div style={{
        margin: 0,
        color: "#000",
        fontWeight: 600,
        fontSize: "20px",
        lineHeight: "28px"
      }}>暂无数据</div>
    </div>
  )
}