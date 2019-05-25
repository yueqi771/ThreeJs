import * as THREE from '../../lib/three.js'

const font = { "glyphs": { "0": { "ha": 868, "x_min": 0, "x_max": 696, "o": "m 0 868 l 696 868 l 696 693 l 0 693 l 0 868 m 696 0 l 0 0 l 0 175 l 696 175 l 696 0 m 0 694 l 175 694 l 175 174 l 0 174 l 0 694 m 521 694 l 696 694 l 696 174 l 521 174 l 521 694 z " }, "1": { "ha": 521, "x_min": 0, "x_max": 347, "o": "m 174 0 l 347 0 l 347 868 l 0 868 l 0 694 l 174 694 l 174 0 z " }, "2": { "ha": 868, "x_min": 0, "x_max": 694, "o": "m 0 868 l 0 694 l 521 694 l 521 521 l 0 521 l 0 0 l 694 0 l 694 174 l 174 174 l 174 347 l 694 347 l 694 868 l 0 868 z " }, "3": { "ha": 868, "x_min": 0, "x_max": 694, "o": "m 694 0 l 694 868 l 0 868 l 0 694 l 521 694 l 521 521 l 0 521 l 0 347 l 521 347 l 521 174 l 0 174 l 0 0 l 694 0 z " }, "4": { "ha": 868, "x_min": 0, "x_max": 694, "o": "m 521 347 l 174 347 l 174 868 l 0 868 l 0 174 l 521 174 l 521 0 l 694 0 l 694 868 l 521 868 l 521 347 z " }, "5": { "ha": 868, "x_min": 0, "x_max": 694, "o": "m 694 694 l 694 868 l 0 868 l 0 347 l 521 347 l 521 174 l 0 174 l 0 0 l 694 0 l 694 521 l 174 521 l 174 694 l 694 694 z " }, "6": { "ha": 868, "x_min": 0, "x_max": 694, "o": "m 0 869 l 175 869 l 175 0 l 0 0 l 0 869 m 174 519 l 694 519 l 694 346 l 174 346 l 174 519 m 174 869 l 519 869 l 519 694 l 174 694 l 174 869 m 174 174 l 694 174 l 694 0 l 174 0 l 174 174 m 521 347 l 694 347 l 694 174 l 521 174 l 521 347 z " }, "7": { "ha": 868, "x_min": 0, "x_max": 694, "o": "m 0 868 l 0 694 l 521 694 l 521 521 l 694 521 l 694 868 l 0 868 m 347 347 l 521 347 l 521 521 l 347 521 l 347 347 m 174 0 l 347 0 l 347 347 l 174 347 l 174 0 z " }, "8": { "ha": 868, "x_min": 0, "x_max": 694, "o": "m 0 868 l 174 868 l 174 0 l 0 0 l 0 868 m 521 868 l 694 868 l 694 0 l 521 0 l 521 868 m 174 174 l 521 174 l 521 0 l 174 0 l 174 174 m 174 868 l 521 868 l 521 693 l 174 693 l 174 868 m 174 521 l 521 521 l 521 346 l 174 346 l 174 521 z " }, "9": { "ha": 868, "x_min": 0, "x_max": 696, "o": "m 0 521 l 696 521 l 696 346 l 0 346 l 0 521 m 0 868 l 694 868 l 694 694 l 0 694 l 0 868 m 0 696 l 175 696 l 175 519 l 0 519 l 0 696 m 521 696 l 694 696 l 694 521 l 521 521 l 521 696 m 521 349 l 696 349 l 696 -1 l 521 -1 l 521 349 m 174 174 l 521 174 l 521 -1 l 174 -1 l 174 174 z " }, "+": { "ha": 694, "x_min": 0, "x_max": 521, "o": "m 174 174 l 347 174 l 347 347 l 521 347 l 521 521 l 347 521 l 347 694 l 174 694 l 174 521 l 0 521 l 0 347 l 174 347 l 174 174 z " }, "了": { "ha": 1389, "x_min": 72, "x_max": 1278, "o": "m 659 954 q 1092 1246 891 1096 l 72 1246 l 72 1358 l 1278 1358 l 1278 1225 q 781 899 1035 1058 l 781 400 q 730 216 781 266 q 544 159 680 161 q 323 164 469 159 q 301 293 315 231 q 534 277 437 278 q 659 400 659 275 l 659 954 z " }, "住": { "ha": 1389, "x_min": 18, "x_max": 1364, "o": "m 423 279 l 841 279 l 841 694 l 502 694 l 502 793 l 841 793 l 841 1122 l 464 1122 l 464 1221 l 1324 1221 l 1324 1122 l 949 1122 l 949 793 l 1286 793 l 1286 694 l 949 694 l 949 279 l 1364 279 l 1364 180 l 423 180 l 423 279 m 18 788 q 346 1462 235 1084 l 457 1430 q 339 1135 401 1274 l 339 129 l 233 129 l 233 926 q 64 670 152 783 q 18 788 45 730 m 773 1407 l 860 1462 q 996 1287 935 1373 l 897 1225 q 773 1407 837 1325 z " }, "力": { "ha": 1389, "x_min": 30, "x_max": 1265, "o": "m 87 1154 l 526 1154 q 532 1458 530 1303 l 650 1458 q 643 1154 647 1314 l 1265 1154 q 1234 406 1249 625 q 985 170 1217 172 q 716 175 873 170 q 696 302 711 228 l 700 302 q 974 288 876 286 q 1119 433 1105 290 q 1143 1044 1135 677 l 640 1044 q 528 513 628 690 q 110 132 420 315 q 30 235 72 180 q 415 567 323 399 q 522 1044 510 720 l 87 1044 l 87 1154 z " }, "太": { "ha": 1389, "x_min": 19, "x_max": 1367, "o": "m 19 229 q 616 1019 548 514 l 43 1019 l 43 1123 l 624 1123 q 629 1453 629 1260 l 747 1453 q 743 1123 747 1280 l 1344 1123 l 1344 1019 l 749 1019 q 1367 262 891 467 q 1270 155 1303 199 q 694 878 831 401 q 102 129 581 411 q 19 229 75 164 m 540 408 l 625 476 q 817 267 723 372 l 720 190 q 540 408 636 297 z " }, "好": { "ha": 1389, "x_min": 24, "x_max": 1370, "o": "m 591 376 l 511 290 q 358 430 434 362 q 90 145 258 275 q 27 232 61 187 q 283 496 189 349 q 79 671 176 590 q 168 1073 127 842 l 24 1073 l 24 1173 l 184 1173 q 227 1459 206 1309 l 336 1444 q 290 1173 312 1295 l 547 1173 l 547 1086 q 414 521 515 718 q 591 376 503 449 m 545 849 l 918 849 l 918 1061 q 1165 1268 1053 1175 l 594 1268 l 594 1366 l 1314 1366 l 1314 1260 q 1025 1015 1168 1135 l 1025 849 l 1370 849 l 1370 751 l 1025 751 l 1025 316 q 850 152 1025 152 q 673 156 793 152 q 655 263 666 206 q 836 251 777 252 q 918 332 918 251 l 918 751 l 545 751 l 545 849 m 442 1073 l 271 1073 q 189 699 224 812 l 332 585 q 442 1073 423 774 z " }, "很": { "ha": 1389, "x_min": 22, "x_max": 1370, "o": "m 552 1381 l 1248 1381 l 1248 716 l 1145 716 l 1145 750 l 886 750 q 1002 526 928 627 q 1248 688 1134 605 l 1313 604 q 1058 457 1188 528 q 1370 235 1183 323 q 1287 138 1331 191 q 785 750 902 370 l 655 750 l 655 297 q 899 408 753 336 q 921 308 909 351 q 658 175 825 267 q 579 117 617 151 l 507 210 q 552 316 552 254 l 552 1381 m 22 650 q 395 1111 245 842 l 488 1058 q 343 844 419 944 l 343 123 l 239 123 l 239 715 q 69 545 157 623 q 22 650 49 600 m 1145 1289 l 655 1289 l 655 1112 l 1145 1112 l 1145 1289 m 28 1070 q 376 1458 243 1234 l 469 1404 q 79 972 312 1164 q 28 1070 54 1024 m 655 841 l 1145 841 l 1145 1021 l 655 1021 l 655 841 z " }, "快": { "ha": 1389, "x_min": 18, "x_max": 1354, "o": "m 407 779 l 768 779 q 783 1115 779 891 l 499 1115 l 499 1210 l 784 1210 q 784 1447 784 1317 l 891 1447 q 890 1210 891 1320 l 1221 1210 l 1221 779 l 1354 779 l 1354 684 l 914 684 q 1345 232 1025 374 q 1256 127 1312 199 q 840 623 948 302 q 442 117 758 317 q 363 208 397 175 q 754 684 688 399 l 407 684 l 407 779 m 209 1447 l 311 1447 l 311 1149 l 363 1184 q 515 994 452 1086 l 435 936 q 311 1108 376 1028 l 311 122 l 209 122 l 209 1447 m 1115 1115 l 888 1115 q 876 779 886 899 l 1115 779 l 1115 1115 m 77 1135 l 168 1122 q 109 776 148 959 q 18 798 71 785 q 77 1135 50 937 z " }, "棒": { "ha": 1389, "x_min": 8, "x_max": 1375, "o": "m 487 423 l 837 423 l 837 557 l 605 557 l 605 636 q 456 517 538 574 q 385 595 434 545 q 654 841 556 701 l 449 841 l 449 926 l 705 926 q 749 1039 732 981 l 528 1039 l 528 1124 l 770 1124 q 789 1236 781 1177 l 488 1236 l 488 1321 l 798 1321 q 806 1457 803 1386 l 906 1457 q 898 1321 903 1386 l 1312 1321 l 1312 1236 l 888 1236 q 871 1124 882 1176 l 1275 1124 l 1275 1039 l 852 1039 q 814 926 838 982 l 1366 926 l 1366 841 l 1085 841 q 1375 621 1191 690 q 1313 530 1341 576 q 1161 632 1229 575 l 1161 557 l 936 557 l 936 423 l 1290 423 l 1290 338 l 936 338 l 936 122 l 837 122 l 837 338 l 487 338 l 487 423 m 8 609 q 206 1101 130 807 l 24 1101 l 24 1195 l 209 1195 l 209 1459 l 304 1459 l 304 1195 l 461 1195 l 461 1101 l 304 1101 l 304 869 l 353 909 q 472 769 419 834 l 401 711 q 304 840 359 772 l 304 123 l 209 123 l 209 886 q 52 490 141 642 q 8 609 34 549 m 837 760 l 936 760 l 936 643 l 1147 643 q 989 841 1050 730 l 770 841 q 612 643 709 736 l 837 643 l 837 760 z " }, "稳": { "ha": 1389, "x_min": 7, "x_max": 1386, "o": "m 530 690 l 1183 690 l 1183 808 l 556 808 l 556 897 l 1183 897 l 1183 1013 l 559 1013 l 559 1099 l 540 1080 q 461 1146 506 1112 q 711 1469 614 1286 l 817 1449 q 749 1339 784 1393 l 1153 1339 l 1153 1252 q 1042 1104 1099 1179 l 1286 1104 l 1286 551 l 1183 551 l 1183 600 l 530 600 l 530 690 m 7 519 q 214 964 134 696 l 31 964 l 31 1058 l 222 1058 l 222 1275 q 58 1261 141 1268 q 39 1358 52 1303 q 484 1402 260 1371 l 506 1303 q 323 1284 415 1293 l 323 1058 l 492 1058 l 492 964 l 323 964 l 323 802 l 378 845 q 524 682 456 766 l 444 617 q 323 772 385 701 l 323 125 l 222 125 l 222 726 q 53 407 152 538 q 7 519 33 464 m 640 519 l 743 519 l 743 327 q 830 248 743 248 l 960 248 q 1061 316 1046 248 q 1081 442 1073 370 q 1184 401 1126 422 q 1154 274 1171 332 q 990 156 1124 156 l 810 156 q 640 321 640 156 l 640 519 m 1031 1251 l 689 1251 q 564 1104 629 1172 l 925 1104 q 1031 1251 982 1181 m 494 519 l 585 487 q 477 217 538 345 q 385 259 434 240 q 494 519 449 374 m 1177 477 l 1264 517 q 1386 274 1340 372 l 1293 229 q 1177 477 1248 339 m 795 544 l 868 594 q 1009 419 948 502 l 926 361 q 795 544 867 456 z " }, "给": { "ha": 1389, "x_min": 18, "x_max": 1378, "o": "m 551 693 l 1237 693 l 1237 121 l 1134 121 l 1134 212 l 654 212 l 654 119 l 551 119 l 551 693 m 184 646 q 467 667 191 646 q 454 581 460 625 q 68 543 228 560 l 46 628 q 252 914 127 705 q 46 899 165 909 l 18 983 q 273 1450 134 1116 l 380 1412 q 136 991 247 1157 q 297 994 217 993 q 399 1180 346 1078 l 499 1137 q 184 646 311 823 m 1134 601 l 654 601 l 654 304 l 1134 304 l 1134 601 m 971 1450 l 943 1404 q 1378 975 1101 1145 q 1299 888 1339 936 q 886 1313 1034 1077 q 502 871 738 1063 q 423 945 476 901 q 850 1450 697 1154 l 971 1450 m 597 947 l 1191 947 l 1191 854 l 597 854 l 597 947 m 23 331 q 476 425 275 378 q 477 330 475 376 q 58 232 201 273 l 23 331 z " }, "超": { "ha": 1389, "x_min": 23, "x_max": 1370, "o": "m 23 248 q 134 791 126 427 l 235 785 q 214 541 231 654 q 343 370 263 435 l 343 873 l 30 873 l 30 971 l 301 971 l 301 1166 l 77 1166 l 77 1264 l 301 1264 l 301 1457 l 407 1457 l 407 1264 l 609 1264 l 609 1166 l 407 1166 l 407 971 l 627 971 l 627 873 l 445 873 l 445 662 l 639 662 l 639 566 l 445 566 l 445 311 q 671 269 543 270 q 1370 274 929 264 q 1332 170 1345 214 q 637 172 922 167 q 193 408 309 180 q 83 121 153 232 q 23 248 56 184 m 711 836 l 1278 836 l 1278 351 l 1177 351 l 1177 410 l 811 410 l 811 343 l 711 343 l 711 836 m 644 1308 l 644 1398 l 1293 1398 q 1274 1086 1286 1214 q 1112 928 1259 932 q 943 932 1039 926 q 922 1039 935 981 q 1092 1024 1023 1023 q 1177 1111 1169 1024 q 1191 1308 1187 1190 l 933 1308 q 705 879 922 1001 q 640 964 680 921 q 831 1308 827 1067 l 644 1308 m 1177 745 l 811 745 l 811 500 l 1177 500 l 1177 745 z " }, "越": { "ha": 1389, "x_min": 26, "x_max": 1370, "o": "m 26 233 q 134 791 130 422 l 228 785 q 213 538 227 652 q 339 373 262 435 l 339 873 l 30 873 l 30 966 l 298 966 l 298 1166 l 77 1166 l 77 1259 l 298 1259 l 298 1455 l 393 1455 l 393 1259 l 602 1259 l 602 1166 l 393 1166 l 393 966 l 624 966 l 624 873 l 434 873 l 434 658 l 608 658 l 608 566 l 434 566 l 434 315 q 666 269 534 270 q 1370 274 981 264 q 1332 168 1345 214 q 637 172 947 168 q 191 406 316 178 q 83 121 155 232 q 26 233 56 184 m 770 395 q 987 644 895 511 q 917 1112 933 829 l 758 1112 l 758 650 q 897 773 819 703 q 917 674 905 720 q 755 529 837 606 q 692 457 726 500 l 624 525 q 666 658 666 579 l 666 1200 l 913 1200 q 909 1459 909 1328 l 1001 1459 q 1005 1200 1000 1336 l 1340 1200 l 1340 1112 l 1009 1112 q 1058 750 1020 902 q 1180 1017 1133 878 l 1271 979 q 1093 632 1196 792 q 1154 507 1120 560 q 1202 467 1179 467 q 1230 517 1222 467 q 1253 726 1242 604 q 1347 692 1316 703 q 1318 471 1332 544 q 1215 355 1298 355 q 1088 431 1142 355 q 1027 538 1054 476 q 844 331 944 426 q 770 395 818 362 m 1074 1404 l 1145 1455 q 1278 1298 1203 1392 l 1199 1242 q 1074 1404 1130 1340 z " }, "！": { "ha": 1389, "x_min": 608, "x_max": 781, "o": "m 761 1321 l 746 570 l 639 570 l 624 1321 l 761 1321 m 694 426 q 755 401 730 426 q 781 340 781 376 q 755 279 781 304 q 694 255 730 255 q 633 279 659 255 q 608 340 608 304 q 633 401 608 376 q 694 426 659 426 z " } }, "familyName": "Microsoft YaHei", "ascender": 1636, "descender": -296, "underlinePosition": -119, "underlineThickness": 80, "boundingBox": { "yMin": -186, "xMin": -220, "yMax": 1706, "xMax": 1763 }, "resolution": 1000, "original_font_information": { "format": 0, "copyright": "`2005 Microsoft Corporation. All rights reserved.", "fontFamily": "Microsoft YaHei", "fontSubfamily": "Regular", "uniqueID": "Microsoft YaHei-Regular", "fullName": "Microsoft YaHei", "version": "Version 0.71", "postScriptName": "MicrosoftYaHei", "trademark": "Microsoft YaHei is either a registered trademark or a trademark of Microsoft Corporation in the United States and/or other countries.", "manufacturer": "Microsoft Corporation", "designer": "Founder", "description": "Microsoft YaHei is a Simplified Chinese font developed by taking advantage of ClearType technology, and it provides excellent reading experience particularly onscreen. The font is very legible at small sizes.", "manufacturerURL": "http://www.microsoft.com/typography", "designerURL": "http://www.founder.com.cn/cn", "licence": "\r\nNOTIFICATION OF LICENSE AGREEMENT \r\n\r\nThis font software is part of the Microsoft software product in which it was included and is provided under the end user license agreement (“EULA”) for that Microsoft software product. The terms and conditions of the EULA govern the use of font software. Please refer to the applicable Microsoft product EULA if you have any questions about how you may use this font software. Microsoft reserves all rights that are not expressly granted in the EULA. For products that may have installed this font please see the license link.\r\n", "licenceURL": "http://www.microsoft.com/typography/fonts" }, "cssFontWeight": "normal", "cssFontStyle": "normal" }

const fontObj = new THREE.Font(font);

export default fontObj