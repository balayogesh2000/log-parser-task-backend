exports.logParser = (req, res) => {
  try {
    let logs = req.file.buffer.toString();
    logs = logs
      .split("\n")
      .map((item) => item.trim())
      .filter((item) => item !== "");
    let final = [];
    let str = "";
    logs.forEach((item) => {
      if (item[item.length - 1] !== "}") {
        str += item;
      } else {
        str += item;
        final.push(str);
        str = "";
      }
    });

    const getUnixTime = (dateStr) => {
      const date = new Date(dateStr);
      const unixTimestamp = Math.floor(date.getTime() / 1000);
      return unixTimestamp;
    };

    final = final.map((item) => {
      let temp = item.split(" - ");
      let obj = {};
      obj.timestamp = getUnixTime(temp[0]);
      obj.loglevel = temp[1];
      return { ...obj, ...JSON.parse(temp[2]) };
    });

    console.log(final);
    final = JSON.stringify(final);
    res.status(200).json({
      status: "success",
      data: final,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      status: "fail",
      error: error.message,
    });
  }
};
