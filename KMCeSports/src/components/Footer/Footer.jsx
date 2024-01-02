import React from "react";
import { images } from "../../assets";
const Footer = () => {
  return (
    <div>
      <footer style={{backgroundColor: "rgb(31 41 55)"}}>
        <div
          className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8 "
          style={{ background: "#1F2937" }}
        >
          <div className="md:flex md:justify-between">
            <div className="mb-6 md:mb-0">
              <a href="#" className="flex items-center">
                <img
                  src={images.KMCeSportsLogo}
                  className="h-14 me-3"
                  alt="KMCeSports Logo"
                />
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-[#47F252]">
                  KMCeSports
                </span>
              </a>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-[#47F252]">
                  Resources
                </h2>
                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                  <li className="mb-4" style={{ marginLeft: "0rem" }}>
                    <a
                      href="#"
                      className="hover:underline hover:text-[#47F252]"
                    >
                      About Us
                    </a>
                  </li>
                  <li style={{ marginLeft: "0rem", marginBottom: "1rem" }}>
                    <a
                      href="#"
                      className="hover:underline hover:text-[#47F252]"
                    >
                      How to join ?
                    </a>
                  </li>
                  <li style={{ marginLeft: "0rem", marginBottom: "1rem" }}>
                    <a
                      href="#"
                      className="hover:underline hover:text-[#47F252]"
                    ></a>
                  </li>
                  <li style={{ marginLeft: "0rem", marginBottom: "1rem" }}>
                    <a
                      href="#"
                      className="hover:underline hover:text-[#47F252]"
                    >
                      Prize Pool
                    </a>
                  </li>
                  <li style={{ marginLeft: "0rem", marginBottom: "1rem"   ,  textWrap: "nowrap" }}>
                    <a
                      href="#"
                      className="hover:underline hover:text-[#47F252]"

                    >
                      Become a Moderator
                      <br />
                      /Contributor
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-[#47F252]">
                  Follow us
                </h2>
                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                  <li className="mb-4" style={{ marginLeft: "0rem" }}>
                    <a
                      href="#"
                      className="hover:underline hover:text-[#47F252] "
                    >
                      Facebook
                    </a>
                  </li>
                  <li className="mb-4" style={{ marginLeft: "0rem" }}>
                    <a
                      href="#"
                      className="hover:underline hover:text-[#47F252] "
                    >
                      Instagram
                    </a>
                  </li>
                  <li className="mb-4" style={{ marginLeft: "0rem" }}>
                    <a
                      href="#"
                      className="hover:underline hover:text-[#47F252] "
                    >
                      Github
                    </a>
                  </li>
                  <li style={{ marginLeft: "0rem" }}>
                    <a
                      href="#"
                      className="hover:underline hover:text-[#47F252]"
                    >
                      Discord
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-[#47F252]">
                  Legal
                </h2>
                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                  <li className="mb-4" style={{ marginLeft: "0rem" }}>
                    <a
                      href="#"
                      className="hover:underline hover:text-[#47F252]"
                    >
                      Privacy Policy
                    </a>
                  </li>
                  <li style={{ marginLeft: "0rem"  ,  textWrap: "nowrap"}}>
                    <a
                      href="#"
                      className="hover:underline hover:text-[#47F252]"
                    >
                      Terms &amp; Conditions
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <div className="sm:flex sm:items-center sm:justify-between">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
              © 2024{" "}
              <a href="#" className="hover:underline hover:text-[#47F252]">
                KMCeSports™
              </a>
              . All Rights Reserved.
            </span>
            <div className="flex mt-4 sm:justify-center sm:mt-0">
              <a
                href="#"
                className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 8 19"
                  style={{ width: "24px", height: "24px" }}
                >
                  <path
                    fillRule="evenodd"
                    d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="sr-only">Facebook page</span>
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5"
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 21 16"
                  style={{ width: "24px", height: "24px" }}
                >
                  <path d="M16.942 1.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.585 11.585 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3A17.392 17.392 0 0 0 .182 13.218a15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.63 10.63 0 0 1-1.706-.83c.143-.106.283-.217.418-.33a11.664 11.664 0 0 0 10.118 0c.137.113.277.224.418.33-.544.328-1.116.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM6.678 10.813a1.941 1.941 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z" />
                </svg>
                <span className="sr-only">Discord community</span>
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5"
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 17"
                  style={{ width: "24px", height: "24px" }}
                >
                  <path
                    fillRule="evenodd"
                    d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="sr-only">Twitter page</span>
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5"
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  style={{ width: "24px", height: "24px" }}
                >
                  <path
                    fillRule="evenodd"
                    d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="sr-only">GitHub account</span>
              </a>
              <a
  href="#"
  className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5"
>
  <svg
    version="1.0"
    xmlns="http://www.w3.org/2000/svg"
    width="512.000000pt"
    height="512.000000pt"
    viewBox="0 0 512.000000 512.000000"
    preserveAspectRatio="xMidYMid meet"
    style={{ width: "24px", height: "24px" }}
  >
   <g
      transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
      fill="currentColor" 
      stroke="none"
    >
      <path
        d="M1609 5110 c-330 -14 -556 -56 -747 -138 -179 -77 -285 -148 -417
-279 -178 -177 -289 -376 -359 -643 -62 -236 -76 -507 -76 -1490 0 -967 13
-1241 71 -1477 144 -587 574 -961 1207 -1048 181 -24 561 -35 1287 -35 675 0
1064 10 1239 31 358 42 638 166 859 378 249 240 381 527 429 936 19 160 19
2294 0 2445 -39 306 -130 558 -274 751 -71 96 -223 241 -318 306 -215 145
-474 225 -815 254 -161 13 -1813 20 -2086 9z m2163 -483 c285 -42 445 -113
599 -266 100 -100 155 -188 204 -324 82 -230 90 -352 90 -1482 0 -651 -4 -964
-13 -1069 -29 -347 -98 -534 -260 -707 -169 -180 -380 -269 -707 -299 -177
-17 -1640 -25 -1977 -11 -152 6 -311 16 -354 22 -189 26 -372 93 -486 176 -71
53 -185 177 -227 247 -84 140 -134 337 -151 587 -30 454 -20 2012 14 2270 36
267 119 447 276 599 172 167 398 248 748 270 76 4 587 7 1137 5 853 -2 1016
-4 1107 -18z"
      />
      <path
        d="M3802 4200 c-113 -57 -167 -145 -167 -275 0 -94 22 -150 86 -214 64
-63 120 -86 214 -86 67 0 89 4 137 28 101 50 158 137 166 253 7 103 -16 163
-87 235 -66 66 -124 89 -221 89 -54 0 -78 -6 -128 -30z"
      />
      <path
        d="M2336 3854 c-263 -48 -496 -171 -692 -368 -260 -259 -385 -562 -385
-926 0 -220 41 -401 132 -583 280 -556 896 -841 1495 -692 236 59 418 161 595
332 159 154 266 322 333 523 48 145 66 257 66 420 0 162 -18 275 -65 417 -64
192 -157 344 -302 494 -198 204 -445 336 -717 384 -111 19 -352 19 -460 -1z
m396 -458 c458 -88 762 -538 674 -999 -54 -279 -259 -527 -521 -628 -128 -50
-202 -62 -350 -56 -105 4 -146 10 -215 32 -303 96 -524 341 -586 649 -24 119
-15 304 21 416 94 298 345 525 644 585 89 18 243 18 333 1z"
      />
    </g>
  </svg>

  <span className="sr-only">Instagram</span>
</a>

            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default Footer;
