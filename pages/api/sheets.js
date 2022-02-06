import { google } from 'googleapis';

export async function getHomePgDataFromSheet() {
    try {
      const target = ["https://www.googleapis.com/auth/spreadsheets.readonly"];
      const jwt = new google.auth.JWT(
        process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        null,
        (process.env.GOOGLE_SHEETS_PRIVATE_KEY || "").replace(/\\n/g, "\n"),
        target
      );
  
      const sheets = google.sheets({ version: "v4", auth: jwt });
      const response = await sheets.spreadsheets.values.batchGet({
        spreadsheetId: process.env.SPREADSHEET_ID,
        ranges: ['get_home!A2:G', 'guild_weekly!A2:F', 'get_1kers!A2:B'],
      });
      const ranges = response.data.valueRanges;
      
      let playerWeekly, guildWeekly, flagWeekly;                                    // weekly ranking data
      if (ranges[0].values.length) {                             
        playerWeekly = ranges[0].values.map((row, index) => ({
          ign: row[0],
          avatar: row[1],
          culvert_streak: row[2],
          flag_streak: row[3],
          culvert: row[4],
          flag: row[5],
          index: index
        }));
      }
      if (ranges[1].values.length) {
        guildWeekly = {
          culvert: ranges[1].values[ranges[1].values.length - 1][1],
          flag: ranges[1].values[ranges[1].values.length - 1][3],
          map: ranges[1].values[ranges[1].values.length - 1][5]
        }
      }
      if (ranges[2].values.length) {
        flagWeekly = ranges[2].values.map((row) => ({
          ign: row[0],
          avatar: row[1] ? row[1] : ""
        }));
      }
    
        return {
          playerWeekly: playerWeekly,
          guildWeekly: guildWeekly,
          flagWeekly: flagWeekly
        };
    } catch (err) {
      console.log(err);
    }
  
    return {};
}

export async function getPlayerFromSheet(index) {
  const rowNum = Number(index) + 2;
  try {
    const target = ["https://www.googleapis.com/auth/spreadsheets.readonly"];
    const jwt = new google.auth.JWT(
      process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      null,
      (process.env.GOOGLE_SHEETS_PRIVATE_KEY || "").replace(/\\n/g, "\n"),
      target
    );

    const sheets = google.sheets({ version: "v4", auth: jwt });
    const response = await sheets.spreadsheets.values.batchGet({
      spreadsheetId: process.env.SPREADSHEET_ID,
      ranges: [`member_info!A${rowNum}:${rowNum}`, `calc_culvert!B2:B`, `calc_culvert!F${rowNum}:${rowNum}`, `calc_flag!F${rowNum}:${rowNum}`],
    });
    const ranges = response.data.valueRanges;
    let memberInfo, weekHeaders, memberCulvert, memberFlag;
    if(ranges[0].values[0].length) {
      memberInfo = {
        ign: ranges[0].values[0][0],
        avatar: ranges[0].values[0][2],
        class: ranges[0].values[0][3],
        level: ranges[0].values[0][4],
        culvert_streak: ranges[0].values[0][5],
        flag_streak: ranges[0].values[0][6],
        lifetime_culvert: ranges[0].values[0][7],
        lifetime_flag: ranges[0].values[0][8],
        best_culvert: ranges[0].values[0][9],
        best_flag: ranges[0].values[0][10]
      }
    }
    if(ranges[1].values.length) {
      weekHeaders = [].concat(...ranges[1].values);
    }
    if(ranges[2].values[0].length) {
      memberCulvert = ranges[2].values[0].reduce(function(memberCulvert, score, index) {
        if(score)
          memberCulvert[weekHeaders[index]] = score;
        return memberCulvert; 
      }, {});
    }
    if(ranges[3].values[0].length) {
      memberFlag = ranges[2].values[0].reduce(function(memberFlag, score, index) {
        if(score)
        memberFlag[weekHeaders[index]] = score;
        return memberFlag; 
      }, {});
    }
    return {
      memberInfo: memberInfo,
      memberCulvert: memberCulvert,
      memberFlag: memberFlag
    };
  } catch (err) {
    console.log(err);
  }

  return {};
}