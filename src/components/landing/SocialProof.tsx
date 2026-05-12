export function SocialProof() {
  const avatars = [
    { initials: "AR", bg: "#A78BFA" },
    { initials: "BS", bg: "#818CF8" },
    { initials: "CK", bg: "#60A5FA" },
    { initials: "DL", bg: "#34D399" },
  ];

  return (
    <div className="social-proof">
      <div className="avatar-stack">
        {avatars.map((avatar) => (
          <div
            key={avatar.initials}
            className="avatar"
            style={{ backgroundColor: avatar.bg }}
          >
            {avatar.initials}
          </div>
        ))}
        <div className="avatar avatar-more">+96</div>
      </div>
      <div className="proof-text">
        <strong>100+ alumni</strong> sudah bekerja di
        <br />
        <span className="company-names">
          Tokopedia · GoJek · Bukalapak · startup lainnya
        </span>
      </div>
    </div>
  );
}
