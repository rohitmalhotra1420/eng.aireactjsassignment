import React, { Component } from 'react'
import { storyListApi } from './api';
import StoryListItem from './StoryListItem';
import InfiniteScroll from 'react-infinite-scroller';
class StoryList extends Component {
    state = {
        gettingStories: false,
        storyData: null,
        hasMore: false,
        gettingMore: false
    }
    componentDidMount() {
        this.getStories()
    }
    setRequestTimer = () => {
        this.requestTimer = setInterval(() => {
            this.handleLoadMore()
        }, 10000)
    }
    getStories = () => {
        this.setState({ gettingStories: true })
        let page = 1
        storyListApi(page)
            .then((response) => {
                console.log("GET STORY RESPONSE", response)
                if (response && response.data) {
                    this.setState({
                        storyData: response.data,
                        gettingStories: false,
                        hasMore: page < response.data.nbPages ? true : false
                    })
                    this.setRequestTimer()
                } else {
                    this.setState({ gettingStories: false })
                    alert('Oops! something went wrong.')
                }
            })
            .catch(error => {
                this.setState({ gettingStories: false })
                alert(error.message);
            })
    }
    handleLoadMore = () => {
        const { storyData, gettingMore } = this.state
        if (storyData && storyData.page + 1 <= storyData.nbPages && gettingMore === false) {
            this.setState({
                gettingMore: true
            }, () => {
                let page = storyData.page + 1
                storyListApi(page).then(response => {
                    console.log('LOAD MORE RESPONSE', response)
                    if (response && response.data) {
                        this.setState((prevState) => {
                            return {
                                storyData: {
                                    ...response.data,
                                    hits: [...prevState.storyData.hits, ...response.data.hits]
                                },
                                hasMore: page < response.data.nbPages ? true : false,
                                gettingMore: false
                            }
                        }, () => {
                            //logic to clear interval after total page are fetched
                            if (this.state.hasMore === false) {
                                clearInterval(this.requestTimer)
                            }
                        })
                    } else {
                        this.setState({ gettingMore: false })
                        alert('Oops! something went wrong.')
                    }
                })
                    .catch(error => {
                        this.setState({ gettingMore: false })
                        alert(error.message)
                    })
            })
        }
    }
    render() {
        const { storyData, gettingStories, hasMore } = this.state;
        return (
            <div>
                {gettingStories && <h3>Loading stories...</h3>}
                <div className="table-container">
                    <div className="header-container">
                        <p className="heading">
                            Created At
                        </p>
                        <p className="heading">
                            Title
                        </p>
                        <p className="heading">
                            Author
                        </p>
                        <p className="heading">
                            Url
                        </p>
                    </div>

                    {storyData &&
                        storyData.hits.length > 0 &&
                        <InfiniteScroll
                            pageStart={0}
                            loadMore={this.handleLoadMore}
                            hasMore={hasMore}
                            loader={<h3 key={0}>Loading ...</h3>}
                            useWindow={true}
                        // getScrollParent={() => this.scrollParentRef}
                        >
                            {storyData.hits.map((story, index) => {
                                return (
                                    <StoryListItem story={story} key={index} />
                                )
                            })}
                        </InfiniteScroll>
                    }
                </div>

            </div>
        );
    }
}

export default StoryList;