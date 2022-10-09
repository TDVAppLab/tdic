import {  makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import {format} from 'date-fns';
import { Article } from "../models/article";

export default class ArticleStore {
    articleRegistry = new Map<number, Article>();
    selectedArticle: Article| undefined = undefined;
    loading=false;

    constructor(){
        makeAutoObservable(this)
    }


    loadArticles = async () => {
        this.loading = true;
        this.articleRegistry.clear();
        try {
            const articles = await agent.Articles.list();
            articles.forEach(article => {
                this.setArticle(article);
            })
            this.setLoading(false);
        } catch (error) {
            console.log(error);
            this.setLoading(false);
        }
    }

    loadArticle = async (id:number) => {
        this.loading = true;
        
        try {
            const object = await agent.Articles.details(id);
            this.setArticle(object);
            runInAction(()=>{
                this.selectedArticle = object;
            })
            this.setLoading(false);
            return object;
        } catch (error) {
            console.log(error);
            this.setLoading(false);
        }
    }

    updateArticle = async (object: Article) => {
        //this.loading = true;
        
        try {
            await agent.Articles.update(object);
            runInAction(() => {
                this.articleRegistry.set(object.id_article, object);
                this.selectedArticle = object;
                //this.loading = false;
            })
            
        }catch (error) {
            console.log(error);
            runInAction(() => {
                //this.loading = false;
            })
        }
    }
    
    
    createArticle = async (object: Article) => {
        this.loading = true;
        console.log("called light create");
        try {
            await agent.Articles.create(object);
            runInAction(() => {
                this.articleRegistry.set(object.id_article, object);
                this.selectedArticle = object;
                this.loading = false;
            })            
        }catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    deleteArticle = async (object: Article) => {
        this.loading = true;
        
        try {
            await agent.Articles.deleteDeep(object.id_article);
            runInAction(() => {
                this.articleRegistry.delete(object.id_article);
                this.loading = false;
            })
            
        }catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }    

    private setArticle = (article : Article) => {
        this.articleRegistry.set(article.id_article,article);
    }

    private getArticle=(id:number) => {
        return this.articleRegistry.get(id);
    }

    setLoading = (state: boolean) => {
        this.loading = state;
    }

}