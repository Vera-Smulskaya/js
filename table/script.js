(() => {
  const dataTransactions = [
    {
      applicationName: "Figma",
      applicationIcon: "assets/figma.png",
      applicationUrl: "www.figma.com/",
      typeCard: "Visa",
      numberCard: "***** 2468",
      userName: "Itai Brach",
      emailUser: "ItaiBracha31@gmail.com",
      dateLastTransaction: 1641074400000,
      sumLastTransaction: "$783.22",
      statusTransaction: "Done",
      dateEndTransaction: 1641938400000,
      totalSum: "$783.22",
      iconDots: "assets/dots.png",
    },
    {
      applicationName: "Adobe XD",
      applicationIcon: "assets/adobe-xd.png",
      applicationUrl: "https://www.adobe.com/",
      typeCard: "Visa",
      numberCard: "***** 2468",
      userName: "Natali Bolgar",
      emailUser: "ItaiBracha31@gmail.com",
      dateLastTransaction: 1641333600000,
      sumLastTransaction: "$783.22",
      statusTransaction: "Done",
      dateEndTransaction: 1642629600000,
      totalSum: "$783.22",
      iconDots: "assets/dots.png",
    },
    {
      applicationName: "Mailchimp",
      applicationIcon: "assets/mailchimp.png",
      applicationUrl: "https://mailchimp.com/",
      typeCard: "Visa",
      numberCard: "***** 2468",
      userName: "Iren Parady",
      emailUser: "ItaiBracha31@gmail.com",
      dateLastTransaction: 1643752800000,
      sumLastTransaction: "$783.22",
      statusTransaction: "Done",
      dateEndTransaction: 1644616800000,
      totalSum: "$783.22",
      iconDots: "assets/dots.png",
    },
    {
      applicationName: "WIX",
      applicationIcon: "assets/wix.png",
      applicationUrl: "https://wix.com/",
      typeCard: "Visa",
      numberCard: "***** 2468",
      userName: "Itai Brach",
      emailUser: "ItaiBracha31@gmail.com",
      dateLastTransaction: 1649451600000,
      sumLastTransaction: "$783.22",
      statusTransaction: "Pending",
      dateEndTransaction: 1651179600000,
      totalSum: "$683.22",
      iconDots: "assets/dots.png",
    },
    {
      applicationName: "Youtube",
      applicationIcon: "assets/youtube.png",
      applicationUrl: "mailto:Itaibracha31@gmail.com",
      typeCard: "Visa",
      numberCard: "***** 2468",
      userName: "Itai Brach",
      emailUser: "ItaiBracha31@gmail.com",
      dateLastTransaction: 1641074400000,
      sumLastTransaction: "$783.22",
      statusTransaction: "Done",
      dateEndTransaction: 1641938400000,
      totalSum: "$883.22",
      iconDots: "assets/dots.png",
    },
  ];

  const ELEMENT_SELECT = document.getElementById("sort");
  const DATA_TRANSACTIONS_COPY = [...dataTransactions];
  const SORTING_OFF_CLASS = "filtres__sorting_off";
  const SORTING_ASC_CLASS = "filtres__sorting_asc";
  const SORTING_DESC_CLASS = "filtres__sorting_desc";
  const SORT_BUTTON = document.getElementById("button-sorting");
  const SORT_DIRECTION = {
    ASC: 0,
    DSC: 1,
    DEFAULT: 2,
  };

  function fillTable(data) {
    const dataTransactionsTable = data.map(
      ({
        applicationName,
        applicationIcon,
        applicationUrl,
        typeCard,
        numberCard,
        userName,
        emailUser,
        dateLastTransaction,
        sumLastTransaction,
        statusTransaction,
        dateEndTransaction,
        totalSum,
        iconDots,
      }) => {
        const classNameStatus =
          statusTransaction === "Done" ? "status_done" : "status_pending";

        const options = { month: "short", day: "numeric", year: "numeric" };
        const formatDateLastTransaction = new Date(
          dateLastTransaction
        ).toLocaleDateString("en-US", options);
        const formatDateEndTransaction = new Date(
          dateEndTransaction
        ).toLocaleDateString("en-US", options);

        return `
        <tr>
            <td rowspan="2">
                <div class="table__square"></div>
            </td>
            <td rowspan="2" class="table__icon">
                <img src="${applicationIcon}" alt="icon"/>
            </td>
            <td class="table__item-name">${applicationName}</td>
            <td class="table__item-name">${typeCard}</td>
            <td class="table__item-name">${userName}</td>
            <td class="table__item-name">${formatDateLastTransaction}</td>
            <td rowspan="2" class="${classNameStatus}">
              <div class="table__status status">
                <div class="status__icon"></div>
                <div>${statusTransaction}</div>
              </div>
            </td>
            <td rowspan="2">${formatDateEndTransaction}</td>
            <td rowspan="2" class="table__total-sum">${totalSum}</td>
            <td rowspan="2" class="table__dots">
                <img src="${iconDots}" alt="icon"/>
            </td>
        </tr>
        <tr>
            <td class="table__details">
                <a href="//www.figma.com/" class="table__details">${applicationUrl}</a>
            </td>
            <td class="table__details">${numberCard}</td>
            <td class="table__details"><a href="mailto:Itaibracha31@gmail.com"
                    class="table__user-mail">${emailUser}</a></td>
            <td class="table__details">${sumLastTransaction}</td>
        </tr>
        `;
      }
    );

    const tableData = document.querySelector("tbody");
    tableData.innerHTML = dataTransactionsTable.join("");
  }
  fillTable(dataTransactions);

  function checkNoData() {
    const tableData = document.querySelector("tbody");
    tableData.innerHTML = `<td colspan="9">
                         <div class="table__no-data">there is no such data in the table</div>
                         </td>`;
  }

  const elementSearch = document.getElementById("search-transaction-name");
  const elementUserName = document.getElementById("filter-user-name");
  const elementStatus = document.getElementById("filter-status-transaction");

  function initFilters() {
    elementSearch.addEventListener("input", () => {
      filter();
    });
    elementUserName.addEventListener("input", () => {
      filter();
    });
    elementStatus.addEventListener("input", () => {
      filter();
    });
  }
  initFilters();

  function filter() {
    const elementSearchValue = elementSearch.value;
    const elementUserNameValue = elementUserName.value;
    const elementStatusValue = elementStatus.value;

    const filteredData = dataTransactions.filter((item) => {
      return (
        item.applicationName
          .toLowerCase()
          .includes(elementSearchValue.toLowerCase()) &&
        item.userName
          .toLowerCase()
          .includes(elementUserNameValue.toLowerCase()) &&
        item.statusTransaction
          .toLowerCase()
          .includes(elementStatusValue.toLowerCase())
      );
    });

    filterDate(filteredData);
  }

  function initFiltersDate() {
    const elementDateStart = document.getElementById(
      "filter-date-start-transaction"
    );

    elementDateStart.addEventListener("input", () => {
      filter();
    });

    const elementDateEnd = document.getElementById(
      "filter-date-end-transaction"
    );
    elementDateEnd.addEventListener("input", () => {
      filter();
    });
  }
  initFiltersDate();

  const dataObj = {
    data: dataTransactions,
    sortDirection: SORT_DIRECTION.DEFAULT,
  };

  function filterDate(data) {
    const dateStart = document.getElementById(
      "filter-date-start-transaction"
    ).value;
    const dateEnd = document.getElementById(
      "filter-date-end-transaction"
    ).value;
    const dateStartSeconds = new Date(dateStart).getTime();
    const dataEndSeconds = new Date(dateEnd).getTime();

    const cases = {
      onlyStartDate: 0,
      onlyEndDate: 1,
      noDates: 2,
      bothDates: 3,
    };
    const currentCase =
      !dateStart && !dateEnd
        ? cases.noDates
        : !dateStart
        ? cases.onlyEndDate
        : !dateEnd
        ? cases.onlyStartDate
        : cases.bothDates;

    switch (currentCase) {
      case cases.onlyStartDate:
        filterTableByDate((item) => {
          const dateSeconds = item.dateLastTransaction;
          return dateStartSeconds <= dateSeconds;
        });
        break;

      case cases.onlyEndDate:
        filterTableByDate((item) => {
          const dateSeconds = item.dateLastTransaction;
          return dateSeconds <= dataEndSeconds;
        });
        break;

      case cases.noDates:
        dataObj.data = data;
        sortTable();
        break;

      case cases.bothDates:
        filterTableByDate((item) => {
          const dateSeconds = item.dateLastTransaction;
          return (
            dateStartSeconds <= dateSeconds && dateSeconds <= dataEndSeconds
          );
        });
        break;
    }

    function filterTableByDate(filterByDate) {
      const filteredData = data.filter(filterByDate);

      if (filteredData.length === 0) {
        checkNoData();
      } else {
        dataObj.data = filteredData;
        sortTable();
      }
    }
  }

  function initSelect() {
    ELEMENT_SELECT.addEventListener("change", () => {
      sortTable();
    });

    SORT_BUTTON.addEventListener("click", () => {
      const classList = SORT_BUTTON.classList;
      if (classList.contains(SORTING_OFF_CLASS)) {
        classList.replace(SORTING_OFF_CLASS, SORTING_ASC_CLASS);
        dataObj.sortDirection = SORT_DIRECTION.ASC;
      } else if (classList.contains(SORTING_ASC_CLASS)) {
        classList.replace(SORTING_ASC_CLASS, SORTING_DESC_CLASS);
        dataObj.sortDirection = SORT_DIRECTION.DSC;
      } else {
        classList.replace(SORTING_DESC_CLASS, SORTING_OFF_CLASS);
        dataObj.sortDirection = SORT_DIRECTION.DEFAULT;
      }

      sortTable();
    });
  }

  initSelect();

  function sortTable() {
    const sortDirection = dataObj.sortDirection;
    const sortField = ELEMENT_SELECT.value;

    if (sortDirection === SORT_DIRECTION.DEFAULT) {
      fillTable(dataObj.data);

      return;
    }

    const dataCopy = [...dataObj.data];

    dataCopy.sort((a, b) => {
      if (a[sortField] === b[sortField]) return 0;

      let result = a[sortField] > b[sortField] ? 1 : -1;

      if (sortDirection === SORT_DIRECTION.DSC) {
        result = -result;
      }

      return result;
    });

    fillTable(dataCopy);
  }
})();